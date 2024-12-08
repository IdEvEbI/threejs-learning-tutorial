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

// 3. 为球体和平面分别创建 MeshBasicMaterial 材质（后续将替换为更高级材质）
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffcc });
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

// 4. 创建球体 Mesh 与平面 Mesh
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

// 5. 调整平面位置，使其作为地面（绕X轴旋转90°，让平面水平放置）
plane.rotation.x = -Math.PI / 2;

// 6. 将球体与平面添加到场景中
scene.add(sphere);
scene.add(plane);

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