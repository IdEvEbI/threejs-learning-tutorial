// 导入 Three.js 模块
import * as THREE from "https://unpkg.com/three@0.171.0/build/three.module.js";

// 创建场景
const scene = new THREE.Scene();

// 创建透视摄像机
const camera = new THREE.PerspectiveCamera(
  75, // 视野角度
  window.innerWidth / window.innerHeight, // 宽高比
  0.1, // 近截面
  1000 // 远截面
);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0); // 对准场景中心

// 创建渲染器并设置大小
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xeeeeee, 1); // 背景颜色设置为浅灰色
document.body.appendChild(renderer.domElement);

// 创建几何体与材质
// 1. 创建一个球体（半径 1，水平分段 32，垂直分段 32）
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

// 2. 创建一个平面（宽 10，高 10）
const planeGeometry = new THREE.PlaneGeometry(10, 10);

// 3. 为球体和平面分别创建材质
/**
 * 1. MeshBasicMaterial：基础材质，不受光照影响，适用于不需要光照的场景。
 * 2. MeshLambertMaterial：支持光照计算的漫反射材质，适用于较柔和的光影效果。
 * 3. MeshPhongMaterial：支持高光反射的材质，可呈现较亮的高光点。
 * 4. MeshStandardMaterial：基于 PBR(Physically Based Rendering) 原理的材质，视觉真实，支持粗糙度、金属度等参数。
 * 5. MeshBasicMaterial：基础材质，不受光照影响，适用于不需要光照的场景。
 * 6. MeshPhysicalMaterial：PBR 材质的升级版，提供更高级的特性（如折射、透明度高级控制、清晰度等）。
 */
const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x00ffcc });
const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });

// 4. 创建球体 Mesh 与平面 Mesh
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

// // 使用 TextureLoader 加载纹理
const textureLoader = new THREE.TextureLoader();
const floorTexture = textureLoader.load("./images/textures/wood.jpg");

// 使用 MeshStandardMaterial 并赋予 map 属性
const texturedFloorMaterial = new THREE.MeshStandardMaterial({
  map: floorTexture,
});

// 将地面的材质替换为带纹理的材质
// plane.material = texturedFloorMaterial;

// 加载法线贴图
const normalMap = textureLoader.load("./images/textures/normalMap.png");

// 使用 MeshStandardMaterial 支持法线贴图的特性
const normalMapMaterial = new THREE.MeshStandardMaterial({
  map: floorTexture,
  normalMap: normalMap,
});

// 将地面的材质替换为带有法线贴图的材质
plane.material = normalMapMaterial;

// 5. 调整平面位置，使其作为地面（绕X轴旋转90°，让平面水平放置）
plane.rotation.x = -Math.PI / 2;

// 6. 将球体与平面添加到场景中
scene.add(sphere);
scene.add(plane);

// 7. 添加金属球体
const metalSphereMaterial = new THREE.MeshStandardMaterial({
  color: 0xcccccc,
  metalness: 1.0,
  roughness: 0.2,
});

const metalSphere = new THREE.Mesh(sphereGeometry, metalSphereMaterial);
scene.add(metalSphere);
metalSphere.position.x = 3; // 将金属球体移到右侧以对比不同材质

// 添加环境光
const ambientLight = new THREE.AmbientLight(0x404040, 1); // 软白光
scene.add(ambientLight);

// 添加方向光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // 白色光
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// 创建动画循环
function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.y += 0.01;
  plane.rotation.z += 0.005; // 平面缓慢旋转
  renderer.render(scene, camera);
}

animate();

// 窗口大小变化
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
