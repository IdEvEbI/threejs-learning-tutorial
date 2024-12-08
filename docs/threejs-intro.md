# Three.js 入门教程

## 一、概述

**Three.js** 是一个基于 WebGL 的 JavaScript 库，旨在简化在网页中创建和显示 3D 图形的过程。通过 Three.js，开发者无需深入掌握底层的 WebGL API 即可 **构建复杂的 3D 场景**、**加载模型**、**应用材质**与**光照效果**，并实现交互功能。本章节将带领你从零开始，逐步搭建一个基本的 Three.js 场景，理解其核心组件的使用方法。

## 二、Three.js 快速体验

本小结将通过代码示例创建一个基本的 Three.js 场景，包括 **场景**、**摄像机**、**渲染器**，并添加一个不断旋转的绿色立方体。

### 2.1 创建 HTML 文件

在 `code/stage01_basic-scene/` 目录下创建 `index.html` 文件：

```html
<!DOCTYPE html>
<html lang="zh-CN">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Three.js 入门示例</title>
  <style>
    body {
      margin: 0;
      overflow: hidden;
    }
  </style>
</head>

<body>
  <script type="module" src="./main.js"></script>
  <!-- 渲染器将会插入到这里 -->
</body>

</html>
```

### 2.2 编写 JavaScript 代码

在同一目录下创建 `main.js` 文件，然后依次完成以下步骤：

1. **导入 Three.js 模块**：

   ```javascript
   import * as THREE from 'https://unpkg.com/three@0.171.0/build/three.module.js';
   ```

2. **创建场景**：

   ```javascript
   const scene = new THREE.Scene();
   ```

3. **创建透视摄像机**：

   ```javascript
   const camera = new THREE.PerspectiveCamera(
       75,
       window.innerWidth / window.innerHeight,
       0.1,
       1000
   );
   ```

4. **创建渲染器并设置大小**：

   ```javascript
   const renderer = new THREE.WebGLRenderer({ antialias: true });
   renderer.setSize(window.innerWidth, window.innerHeight);
   document.body.appendChild(renderer.domElement);
   ```

5. **创建立方体几何体和材质**：

   ```javascript
   const geometry = new THREE.BoxGeometry(1, 1, 1);
   const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // 绿色
   const cube = new THREE.Mesh(geometry, material);
   scene.add(cube);
   ```

6. **调整摄像机位置**：

   ```javascript
   camera.position.z = 5;
   ```

7. **创建动画循环**：

   ```javascript
   function animate() {
       requestAnimationFrame(animate);
       cube.rotation.x += 0.01;
       cube.rotation.y += 0.01;
       renderer.render(scene, camera);
   }
   animate();
   ```

8. **处理窗口大小变化**：

   ```javascript
   window.addEventListener('resize', () => {
       camera.aspect = window.innerWidth / window.innerHeight;
       camera.updateProjectionMatrix();
       renderer.setSize(window.innerWidth, window.innerHeight);
   });
   ```

### 2.3 运行示例

使用本地服务器（例如 **VSCode** 的 **Live Server** 插件）启动项目，然后在浏览器中打开 `index.html`，即可看到一个缓慢旋转的绿色立方体。

**示意图（简单场景构建）**：

```plaintext
   Scene
    |
    +-- Camera (视角)
    |
    +-- Cube (Mesh)
    |    |
    |    +-- Geometry (立方体形状)
    |    +-- Material (绿色材质)
    |
    +-- Renderer (渲染器)
```

## 三、添加光源与材质

在基础场景中，`MeshBasicMaterial` 不受光照影响，物体显示的颜色较为均匀。为了让物体具有更真实的光影效果，我们将添加光源并使用受光照影响的材质。

### 3.1 修改材质

将 `MeshBasicMaterial` 替换为 `MeshStandardMaterial`，使其响应场景中的光源：

```javascript
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // 绿色
```

### 3.2 添加光源

在 `main.js` 中添加环境光与方向光：

```javascript
// 添加环境光
const ambientLight = new THREE.AmbientLight(0x404040, 1); // 软白光
scene.add(ambientLight);

// 添加方向光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // 白色光
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);
```

### 3.3 更新代码

完整的 `main.js` 代码如下：

```javascript
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

// 创建渲染器并设置大小
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建一个立方体几何体和标准材质（可受光照影响）
const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // 原基本材质
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // 可受光照影响的绿色材质
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 添加环境光
const ambientLight = new THREE.AmbientLight(0x404040, 1); // 软白光
scene.add(ambientLight);

// 添加方向光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // 白色光
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// 调整摄像机位置，使立方体可见
camera.position.z = 5;

// 创建动画循环
function animate() {
  requestAnimationFrame(animate);

  // 旋转立方体
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // 渲染场景
  renderer.render(scene, camera);
}

// 启动动画循环
animate();

// 处理窗口大小变化，保持渲染器自适应
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
```

### 3.4 运行并观察效果

刷新浏览器页面后，你应能看到一个带有光照效果的绿色立方体。光源的存在使得立方体表面呈现出高光与阴影，从而增强了立体感。

**示意图（添加光源与材质）**：

```plaintext
   Scene
    |
    +-- Camera (视角)
    |
    +-- Cube (Mesh)
    |    |
    |    +-- Geometry (立方体形状)
    |    +-- Material (受光照影响的绿色材质)
    |
    +-- AmbientLight (环境光)
    +-- DirectionalLight (方向光)
    |
    +-- Renderer (渲染器)
```

## 四、本章小结

通过本章的学习，你已掌握以下内容：

1. **Three.js 核心组件**：了解了 `Scene`、`Camera`、`Renderer` 的基本作用与用法。
2. **几何体与材质**：学会创建几何体并应用不同类型的材质，为物体添加颜色与质感。
3. **光源的添加与配置**：掌握了在场景中添加环境光和方向光，增强物体的立体感与真实度。
4. **基本动画与渲染循环**：理解了如何通过动画循环实现物体旋转等动态效果。

同时，通过示意图和代码示例，你对 Three.js 场景构建的基本流程有了更直观的认识。

## 五、下一步

在掌握了 Three.js 的基础用法后，请继续前往 `docs/object-material.md`，深入学习如何创建更复杂的几何体、应用更高级的材质，以及进一步配置光源与阴影效果，以提升 3D 场景的真实感与美观度。
