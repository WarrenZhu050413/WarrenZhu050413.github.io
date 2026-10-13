// One animal rig. The coat is a continuous surface; paws own ground contact.
// Units and the mouth attachment are shared by the field's approach/carry path.
import { Group, Mesh, BufferGeometry, Float32BufferAttribute, MeshLambertMaterial,
  MeshBasicMaterial, Vector3, CatmullRomCurve3, Shape, ExtrudeGeometry, Line,
  LineBasicMaterial, DoubleSide } from 'three';

const material=colour=>new MeshLambertMaterial({color:colour});
const mix=(a,b,t)=>a+(b-a)*t;
function surface(parent,points,mat,rows=36,sides=20,fringe=0){
  // Rings run along x: [x, centre height, vertical radius, breadth].
  const geometry=new BufferGeometry(),indices=[];
  let vertices=new Float32Array((rows+1)*(sides+1)*3);
  function write(deform=()=>0){
    for(let i=0;i<=rows;i++){
      const u=i/rows*(points.length-1),k=Math.min(points.length-2,Math.floor(u)),t=u-k;
      const p=points[k].map((a,j)=>{
        const b=points[k+1][j],before=points[Math.max(0,k-1)][j],after=points[Math.min(points.length-1,k+2)][j];
        return .5*((2*a)+(-before+b)*t+(2*before-5*a+4*b-after)*t*t+(-before+3*a-3*b+after)*t*t*t);
      });p[2]=Math.max(0,p[2]);p[3]=Math.max(0,p[3]);
      for(let j=0;j<=sides;j++){
        const angle=j/sides*Math.PI*2,edge=1+fringe*Math.sin(angle*13+p[0]*27);
        const index=(i*(sides+1)+j)*3;
        vertices[index]=p[0];vertices[index+1]=p[1]+Math.cos(angle)*p[2]*edge+deform(p[0],angle);
        vertices[index+2]=Math.sin(angle)*p[3]*edge;
      }
    }
    geometry.attributes.position.needsUpdate=true;geometry.computeVertexNormals();
  }
  for(let i=0;i<rows;i++)for(let j=0;j<sides;j++){
    const n=i*(sides+1)+j;indices.push(n,n+1,n+sides+1,n+1,n+sides+2,n+sides+1);
  }
  geometry.setAttribute('position',new Float32BufferAttribute(vertices,3));vertices=geometry.attributes.position.array;geometry.setIndex(indices);write();
  const mesh=new Mesh(geometry,mat);parent.add(mesh);return {mesh,write};
}
function outline(parent,points,opacity=.2){
  const mesh=new Line(new BufferGeometry().setFromPoints(new CatmullRomCurve3(points.map(p=>new Vector3(...p))).getPoints(12)),
    new LineBasicMaterial({color:'#a8ada3',transparent:true,opacity}));parent.add(mesh);return mesh;
}
function limb(parent,fur,radiusAt=u=>.075+.13*(1-u)**2){
  // A single tapered skin follows shoulder/elbow/wrist or hip/knee/hock/paw.
  const geometry=new BufferGeometry(),rows=15,sides=10;
  let positions=new Float32Array((rows+1)*(sides+1)*3);const indices=[];
  geometry.setAttribute('position',new Float32BufferAttribute(positions,3));positions=geometry.attributes.position.array;
  for(let i=0;i<rows;i++)for(let j=0;j<sides;j++){
    const n=i*(sides+1)+j;indices.push(n,n+1,n+sides+1,n+1,n+sides+2,n+sides+1);
  }
  geometry.setIndex(indices);const mesh=new Mesh(geometry,fur);parent.add(mesh);
  const normal=new Vector3(),binormal=new Vector3(),axis=new Vector3(0,0,1),tangent=new Vector3();
  return points=>{
    const curve=new CatmullRomCurve3(points);
    for(let i=0;i<=rows;i++){
      const u=i/rows,point=curve.getPoint(u);curve.getTangent(u,tangent);
      normal.crossVectors(tangent,axis).normalize();binormal.crossVectors(tangent,normal).normalize();
      const radius=radiusAt(u);
      for(let j=0;j<=sides;j++){
        const a=j/sides*Math.PI*2,at=(i*(sides+1)+j)*3;
        positions[at]=point.x+radius*(normal.x*Math.cos(a)+binormal.x*Math.sin(a));
        positions[at+1]=point.y+radius*(normal.y*Math.cos(a)+binormal.y*Math.sin(a));
        positions[at+2]=point.z+radius*(normal.z*Math.cos(a)+binormal.z*Math.sin(a));
      }
    }
    geometry.attributes.position.needsUpdate=true;geometry.computeVertexNormals();
  };
}
export function cat(){
  const root=new Group(),fur=material('#272e2c'),innerEar=material('#343836');
  const body=surface(root,[[-1.5,1.27,0,0],[-1.28,1.34,.42,.38],[-.93,1.35,.56,.43],[-.45,1.4,.46,.37],
    [.05,1.4,.43,.36],[.55,1.41,.54,.4],[.95,1.48,.52,.37],[1.2,1.56,.25,.25],[1.29,1.58,0,0]],fur,56,24,.017);
  const head=new Group();root.add(head);
  const neck=limb(root,fur,u=>.29-.07*u);
  surface(head,[[-.48,-.3,0,0],[-.34,-.2,.41,.37],[-.1,-.16,.48,.39],[.16,-.12,.39,.34],[.31,-.06,.27,.24],[.43,-.08,.13,.16],[.49,-.1,0,0]],fur,40,24,.02);
  // A forehead, sloping nose and cheek planes, rather than a round cartoon head.
  surface(head,[[-.3,.035,0,0],[-.19,.09,.26,.27],[.03,.09,.28,.29],[.22,.04,.21,.24],[.4,-.07,.1,.16],[.48,-.1,0,0]],fur,30,20,.006);
  const eyes=[],ears=[];
  for(const side of [-1,1]){
    const earShape=new Shape();earShape.moveTo(-.145,0);earShape.quadraticCurveTo(-.13,.14,-.08,.28);
    earShape.quadraticCurveTo(-.055,.3,-.015,.25);earShape.quadraticCurveTo(.045,.16,.13,.02);earShape.closePath();
    const ear=new Mesh(new ExtrudeGeometry(earShape,{depth:.055,bevelEnabled:true,bevelThickness:.02,bevelSize:.025,bevelSegments:2,steps:1}),fur);
    ear.position.set(-.13,.25,side*.23);ear.rotation.set(side*.27,side*.12,-.18);head.add(ear);ears.push(ear);
    const inside=new Mesh(new ExtrudeGeometry(earShape,{depth:.005,bevelEnabled:false}),innerEar);
    inside.scale.set(.61,.64,.3);inside.position.set(.008,.045,side>0?.067:-.018);ear.add(inside);
    const eye=new Group();eye.position.set(.205,.065,side*.237);eye.rotation.y=side*.22;head.add(eye);
    // Almond-shaped iris recessed beneath a dark upper lid. One tiny catchlight.
    const iris=new Shape();iris.moveTo(-.068,0);iris.quadraticCurveTo(0,.045,.067,.012);iris.quadraticCurveTo(.01,-.042,-.068,0);
    const irisMesh=new Mesh(new ExtrudeGeometry(iris,{depth:.007,bevelEnabled:false}),material('#889387'));
    eye.add(irisMesh);
    const pupil=surface(eye,[[-.009,0,0,0],[-.006,0,.033,.007],[.006,0,.031,.007],[.01,0,0,0]],material('#141b19'),6,8);
    pupil.mesh.position.set(.018,0,side*.012);
    const glint=surface(eye,[[-.005,0,0,0],[0,0,.008,.006],[.005,0,0,0]],new MeshBasicMaterial({color:'#c2c9b7'}),4,6);
    glint.mesh.position.set(.029,.018,side*.02);eyes.push(eye);
    for(let j=0;j<4;j++)outline(head,[[.34,-.12,side*.15],[.48,-.10-j*.025,side*.36],[.59,-.08-j*.057,side*.6]],.13);
  }
  surface(head,[[.43,-.1,0,0],[.46,-.105,.029,.058],[.49,-.11,0,0]],material('#1b211f'),8,10);
  const legs=[[-1.02,-.29,0,true],[.83,-.29,.23,false],[-1.02,.29,.5,true],[.83,.29,.73,false]].map(([x,z,phase,hind])=>{
    const paw=surface(root,[[-.18,0,0,0],[-.1,.06,.073,.115],[.06,.065,.08,.12],[.22,.055,.04,.075],[.24,.05,0,0]],fur,15,12);
    return {x,z,phase,hind,skin:limb(root,fur),paw:paw.mesh,planted:null,lift:null,stance:false};
  });
  const tailPoints=[new Vector3(-1.27,1.43,0),new Vector3(-1.8,1.4,.1),new Vector3(-2.38,1.72,.14),new Vector3(-2.66,2.2,.05)];
  const tail=limb(root,fur,u=>.006+.16*(1-u)**.65);
  const mouth=new Vector3(.47,-.19,0);
  let last=-Infinity;
  function pose({phase=0,moving=0,lower=0,s=0,tailUp=0,attention=0}){
    const discontinuity=Math.abs(s-last)>.3;last=s;
    const stride=Math.sin(phase*Math.PI*2),breath=Math.sin(s*1.7)*.008;
    body.write((x)=>breath+moving*.035*Math.sin(phase*Math.PI*2-x*2));
    head.position.set(1.25+lower*.42,1.91-lower*1.3+moving*stride*.025,0);
    head.rotation.set(0,Math.sin(s*.63)*.027,-lower*.35+attention*.3);
    neck([new Vector3(.84,1.47,0),new Vector3(1.1,1.65-lower*.5,0),head.position.clone().add(new Vector3(-.23,-.19,0))]);
    const blink=Math.max(0,1-Math.abs((s%8.1)-5.3)/.15);
    eyes.forEach(eye=>eye.scale.y=1-blink*.94);
    ears.forEach((ear,i)=>{ear.rotation.z=-.18+Math.sin(s*.6+i*2)*.035;ear.rotation.y=(i?1:-1)*(.12+attention*.14)});
    root.updateMatrixWorld(true);
    for(const leg of legs){
      const u=((phase+leg.phase)%1+1)%1,stance=u<.69;
      const landing=root.localToWorld(new Vector3(leg.x+.28,.06,leg.z));
      if(discontinuity||!leg.planted||stance&&!leg.stance)leg.planted=landing.clone();
      if(!stance&&leg.stance)leg.lift=leg.planted.clone();
      let foot;
      if(stance){
        foot=root.worldToLocal(leg.planted.clone());
        if(Math.abs(foot.x-leg.x)>.85||Math.abs(foot.z-leg.z)>.48){leg.planted=landing.clone();foot=root.worldToLocal(landing.clone())}
      }else{
        const k=(u-.69)/.31,e=k*k*(3-2*k);
        foot=root.worldToLocal((leg.lift||landing).clone().lerp(landing,e));foot.y+=Math.sin(k*Math.PI)*.17*moving;
      }
      if(!moving){foot.set(leg.x,.06,leg.z);leg.planted=root.localToWorld(foot.clone())}
      const hip=new Vector3(leg.x,1.38+moving*Math.sin((phase+leg.phase)*Math.PI*2)*.045,leg.z*.8);
      const knee=hip.clone().lerp(foot,.43).add(new Vector3(leg.hind?.23:-.1,0,0));
      const hock=foot.clone().add(new Vector3(leg.hind?-.18:-.01,.3,0));
      leg.skin([hip,knee,hock,foot]);leg.paw.position.copy(foot);leg.stance=stance;
    }
    tailPoints[1].set(-1.8,1.42+tailUp*.5,Math.sin(s*.65)*.07);
    tailPoints[2].set(-2.35,1.68+tailUp*.7,.1+Math.sin(s*.65-.5)*.14);
    tailPoints[3].set(-2.58,2.08+tailUp*.5,.08+Math.sin(s*.65-.9)*.17);
    tail(tailPoints);
  }
  return {root,head,mouth,pose};
}
