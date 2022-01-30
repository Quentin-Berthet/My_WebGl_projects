/**
 * title : LABO3
 * author : Quentin Berthet
 */


var VSHADER_SOURCE =
    'attribute vec3 a_Normal;\n' + // Normal
    'attribute vec4 a_Position;\n' +
    'attribute vec4 a_Color;\n' +

    'uniform mat4 u_viewMatrix;\n' +
    'uniform mat4 u_Matrix;\n' +
    'uniform mat4 u_MatrixInverseTransposee;\n' +

    'uniform vec3 u_LightPosition;\n' +
    'varying vec4 v_Color;\n' +
    'varying vec3 v_Normal;\n' +
    'varying vec3 v_LightDirection;\n' +

    'void main() {\n' +
    '  gl_Position = u_viewMatrix * a_Position ;\n' +
    '  v_Color = a_Color;\n' +
    '  v_Normal = mat3(u_MatrixInverseTransposee) * a_Normal;\n' +
    '  vec3 currentPosition = (u_Matrix * a_Position).xyz;\n' +
    '  v_LightDirection = u_LightPosition - currentPosition;\n' +
    '}\n';


const FSHADER_SOURCE =
    'precision mediump float;\n' +

    'varying vec4 v_Color;\n' +
    'varying vec3 v_Normal;\n' +
    'varying vec3 v_LightDirection;\n' +

    'uniform vec3 u_LightDirection;\n' +
    'uniform vec3 u_LightDirectional;\n' +
    'uniform vec3 u_LightPoint;\n' +

    'void main() {\n' +
    '  vec3 normal = normalize(v_Normal.xyz);\n' +

    '  float lightDirectional = dot(normal, u_LightDirection);\n' +
    '  float lightPoint = dot(normal, normalize(v_LightDirection));\n' +

    '  gl_FragColor = vec4((u_LightPoint * v_Color.rgb * lightPoint) + (u_LightDirectional * v_Color.rgb * lightDirectional), v_Color.a);\n' +
    '}\n';
const colors1 = new Float32Array([
    0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
    0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
    0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
    0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
    0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
    0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
    0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
    1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0
]);
const colors2 = new Float32Array([
    1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
    1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
    1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
    1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
    1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
    1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
    1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
    1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0
]);

function initVertexBuffers(gl, opt) {
    // This is the model
    let normals = new Float32Array([
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    ]);

    let vertices = new Float32Array([-0.4, -0.4, -0.4, -0.4, -0.4, 0.4, 0.4, -0.4, -0.4, 0.4, -0.4, 0.4, -0.2, 0.4, -0.2, -0.2, 0.4, 0.2, 0.2, 0.4, -0.2, 0.2, 0.4, 0.2, -0.4, -0.4, 0.4, -0.2, 0.4, 0.2, 0.0, -0.4, 0.4, 0.2, 0.4, 0.2,
        0.4, -0.4, 0.4, -0.4, -0.4, 0.4, -0.2, 0.4, 0.2, -0.4, -0.4, 0.0, -0.2, 0.4, -0.2, -0.4, -0.4, -0.4, 0.4, -0.4, -0.4, 0.2, 0.4, -0.2,
        0.4, -0.4, 0.0, 0.2, 0.4, 0.2, 0.4, -0.4, 0.4, -0.4, -0.4, -0.4, -0.2, 0.4, -0.2, 0.0, -0.4, -0.4, 0.2, 0.4, -0.2, 0.4, -0.4, -0.4, -2.0, -0.5, -2.0, -2.0, -0.5, 2.0, 2.0, -0.5, -2.0, 2.0, -0.5, 2.0
    ]);

    let indices = new Uint8Array([
        0, 2, 1, 2, 3, 1, 4, 5, 6, 5, 7, 6,
        8, 10, 9, 10, 11, 9, 10, 12, 11, 13, 14, 15,
        14, 16, 15, 16, 17, 15, 18, 19, 20, 19, 21, 20,
        21, 22, 20, 23, 24, 25, 24, 26, 25, 26, 27, 25,
        28, 29, 30, 29, 31, 30
    ]);

    const vertexBuffer = gl.createBuffer();
    calculeNormal(vertices, normals, indices);
    // copie les info coordonnée, color et normal au buffer
    var bufferV = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferV);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    var a_attrV = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_attrV, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_attrV);
    computeColor(gl, opt)
    var bufferN = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferN);
    gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);
    var c_attrN = gl.getAttribLocation(gl.program, 'a_Normal');
    gl.vertexAttribPointer(c_attrN, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(c_attrN);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    return indices.length;
}

function computeColor(gl, opt) {
    var bufferC = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferC);
    if (opt == 0) {
        gl.bufferData(gl.ARRAY_BUFFER, colors1, gl.STATIC_DRAW);
    } else {
        gl.bufferData(gl.ARRAY_BUFFER, colors2, gl.STATIC_DRAW);
    }
    var c_attrC = gl.getAttribLocation(gl.program, 'a_Color');
    gl.vertexAttribPointer(c_attrC, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(c_attrC);
}

let optColor = true;

function computeNormal(array1, array2, norm, indices, i) {
    for (let j = 0; j < 3; j++) {
        norm[indices[i + j] * 3] = (array1[1] * array2[2] - array1[2] * array2[1]);
        norm[indices[i + j] * 3 + 1] = (array1[2] * array2[0] - array1[0] * array2[2]);
        norm[indices[i + j] * 3 + 2] = (array1[0] * array2[1] - array1[1] * array2[0]);
    }
}

function calculeNormal(vert, norm, indice) {

    for (let i = 0; i < indice.length; i += 3) {
        let index1 = 3 * indice[i]
        let index2 = 3 * indice[i + 1]
        let index3 = 3 * indice[i + 2]

        let el1 = [vert[index1], vert[index1 + 1], vert[index1 + 2]];
        let el2 = [vert[index2], vert[index2 + 1], vert[index2 + 2]];
        let el3 = [vert[index3], vert[index3 + 1], vert[index3 + 2]];

        let result1 = [];
        for (let i = 0; i < el2.length; i++) {
            result1.push(el2[i] - el1[i]);
        }
        let result2 = [];
        for (let i = 0; i < el3.length; i++) {
            result2.push(el3[i] - el1[i]);
        }
        computeNormal(result1, result2, norm, indice, i)

    }

}


function main() {
    const canvas = document.getElementById('my-canvas');
    const gl = getWebGLContext(canvas);
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)
    gl.clearColor(0, 0, 0, 1);
    gl.enable(gl.DEPTH_TEST);
    var n = initVertexBuffers(gl, 1);

    // Get the storage locations
    let u_viewMatrix = gl.getUniformLocation(gl.program, 'u_viewMatrix')
    let u_LightDirectional = gl.getUniformLocation(gl.program, 'u_LightDirectional')
    let u_LightDirection = gl.getUniformLocation(gl.program, 'u_LightDirection')
    let u_LightPoint = gl.getUniformLocation(gl.program, 'u_LightPoint')
    let u_LightPosition = gl.getUniformLocation(gl.program, 'u_LightPosition')
    let u_Matrix = gl.getUniformLocation(gl.program, 'u_Matrix')
    let u_MatrixInverseTransposee = gl.getUniformLocation(gl.program, 'u_MatrixInverseTransposee')

    //positionne light
    //light1 point | light2 direction utils pour deplacer light
    let Light1Pos = [0.0, 2.0, 0.0];
    let Light2Pos = [0.0, 2.0, 0.0];
    gl.uniform3f(u_LightDirectional, 0.0, 0.0, 0.0);
    let lightDirection = new Vector3(Light2Pos);
    gl.uniform3fv(u_LightDirection, lightDirection.normalize().elements);

    gl.uniform3f(u_LightPoint, 1.0, 1.0, 1.0);
    gl.uniform3fv(u_LightPosition, Light1Pos);

    var viewProjMat = new Matrix4();
    viewProjMat.setPerspective(30.0, canvas.width / canvas.height, 1.0, 10.0);
    viewProjMat.lookAt(3.0, 3.0, 5.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);

    var viewMat = new Matrix4();
    var mat = new Matrix4();
    var matInverseTransposee = new Matrix4();

    var keysMove = [0.0, 0.0];
    var render = function() {

        if (optColor) {
            computeColor(gl, 1)
        } else {
            computeColor(gl, 0)
        }
        gl.uniform3fv(u_LightPosition, Light1Pos);
        //Directional light direction
        lightDirection = new Vector3(Light2Pos);
        gl.uniform3fv(u_LightDirection, lightDirection.normalize().elements);


        mat.setRotate(keysMove[0], 1.0, 0.0, 0.0);
        mat.rotate(angle , 0.0, 1.0 ,0.0)
        mat.rotate(keysMove[1], 0.0, 1.0, 0.0);
        viewMat.set(viewProjMat).multiply(mat);
        gl.uniformMatrix4fv(u_viewMatrix, false, viewMat.elements);
        gl.uniformMatrix4fv(u_Matrix, false, mat.elements);
        matInverseTransposee.setInverseOf(mat).transpose()
        gl.uniformMatrix4fv(u_MatrixInverseTransposee, false, matInverseTransposee.elements);
        drawScene(gl, n, viewProjMat, mat, u_viewMatrix, viewMat, u_Matrix, u_MatrixInverseTransposee, matInverseTransposee, render);
    };
    actionsManager(document, gl, keysMove, u_LightPoint, u_LightDirectional, Light1Pos, Light2Pos, n, viewProjMat, mat, u_viewMatrix, viewMat, u_Matrix, u_MatrixInverseTransposee, matInverseTransposee, render);
    render(0);

}
var angle = 0;

function drawScene(gl, n, viewProjMat, mat, u_viewMatrix, viewMat, u_Matrix, u_MatrixInverseTransposee, matInverseTransposee, render) {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);

    mat.translate(0, 0.80, 0);
    mat.rotate(180, 1.0, 0.0, 0.0);
    viewMat.set(viewProjMat).multiply(mat)
    gl.uniformMatrix4fv(u_viewMatrix, false, viewMat.elements);
    gl.uniformMatrix4fv(u_Matrix, false, mat.elements);

    matInverseTransposee.setInverseOf(mat).transpose()
    gl.uniformMatrix4fv(u_MatrixInverseTransposee, false, matInverseTransposee.elements);
    gl.drawElements(gl.TRIANGLES, n - 6, gl.UNSIGNED_BYTE, 0);
    requestAnimationFrame(render);
}
var cmp = 0;

function check(gl, x, y, n, viewProjMat, mat, u_viewMatrix, viewMat, u_Matrix, u_MatrixInverseTransposee, matInverseTransposee, render) {
    var picked = false;
    drawScene(gl, n, viewProjMat, mat, u_viewMatrix, viewMat, u_Matrix, u_MatrixInverseTransposee, matInverseTransposee, render);
    var pixels = new Uint8Array(4); // Array for storing the pixel value
    gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    console.log(pixels);
    if (pixels[0] != 0 || pixels[1] != 0 || pixels[2] != 0) {
        cmp += 1
        picked = true
        if (cmp % 2 == 0) {
            console.log(cmp);
            optColor = true
            angle += 20;
            if (angle >= 360) {
                angle = 0
            }
        } else {
            optColor = false
            angle += 40;
            if (angle >= 360) {
                angle = 0
            }
        }
    }
    drawScene(gl, n, viewProjMat, mat, u_viewMatrix, viewMat, u_Matrix, u_MatrixInverseTransposee, matInverseTransposee, render);

    //drawScene(gl, programInfo, buffers);
    return picked;
}
var roh = 0;
var gama = 180;


let on = true;

function actionsManager(document, gl, keysMove, u_LightPoint, u_LightDirectional, Light1Pos, Light2Pos, n, viewProjMat, mat, u_viewMatrix, viewMat, u_Matrix, u_MatrixInverseTransposee, matInverseTransposee, render) {
    switchLight = true;
    document.onmousedown = function(ev) { // Mouse is pressed
        var x = ev.clientX,
            y = ev.clientY;
        var rect = ev.target.getBoundingClientRect();
        // If pressed position is inside <canvas>, check if it is above object
        var axe_x = x - rect.left;
        var axe_y = rect.bottom - y;
        console.log(axe_x, axe_y);
        var picked = check(gl, axe_x, axe_y, n, viewProjMat, mat, u_viewMatrix, viewMat, u_Matrix, u_MatrixInverseTransposee, matInverseTransposee, render);
        if (picked) {

            requestAnimationFrame(render);
        }
    }

    document.onkeydown = function(event) {
        switch (event.code) {
            case "KeyJ":
                if (on) {
                    {
                        console.log("1");
                        gl.uniform3f(u_LightPoint, 0.0, 0.0, 0.0);
                        gl.uniform3f(u_LightDirectional, 1.0, 1.0, 1.0);
                        switchLight = false;
                        on = false;
                    }

                } else {

                    console.log("2");
                    gl.uniform3f(u_LightPoint, 1.0, 1.0, 1.0);
                    gl.uniform3f(u_LightDirectional, 0.0, 0.0, 0.0);
                    switchLight = true;
                    on = true;
                }
                break;
            case "KeyE":
                if (switchLight) {
                    Light1Pos[0] += 0.1;
                } else {
                    Light2Pos[0] += 0.1;
                }
                break;
            case "KeyQ":
                if (switchLight) {
                    Light1Pos[0] -= 0.1;
                } else {
                    Light2Pos[0] -= 0.1;
                }
                break;
            case "KeyS":
                if (switchLight) {
                    Light1Pos[1] += 0.1;
                } else {
                    Light2Pos[1] += 0.1;
                }
                break;
            case "KeyW":
                if (switchLight) {
                    Light1Pos[1] -= 0.1;
                } else {
                    Light2Pos[1] -= 0.1;
                }
                break;
            case "KeyA":
                if (switchLight) {
                    Light1Pos[2] -= 0.1;
                } else {
                    Light2Pos[2] -= 0.1;
                }
                break;
            case "KeyD":
                if (switchLight) {
                    Light1Pos[2] += 0.1;
                } else {
                    Light2Pos[2] += 0.1;
                }
                break;
            case "KeyF":
                keysMove[1] += 1;
                break;
            case "KeyH":
                keysMove[1] -= 1;
                break;
            case "KeyT":
                keysMove[0] += 1;
                break;
            case "KeyG":
                keysMove[0] -= 1;
                break;
        }
        document.getElementById("pLX").innerHTML = "x: " + Math.round(Light1Pos[0] * 10);
        document.getElementById("pLY").innerHTML = "y: " + Math.round(Light1Pos[1] * 10);
        document.getElementById("pLZ").innerHTML = "z: " + Math.round(Light1Pos[2] * 10);
        document.getElementById("dLX").innerHTML = "x: " + Math.round(Light2Pos[0] * 10);
        document.getElementById("dLY").innerHTML = "y: " + Math.round(Light2Pos[1] * 10);
        document.getElementById("dLZ").innerHTML = "z: " + Math.round(Light2Pos[2] * 10);
    }
};