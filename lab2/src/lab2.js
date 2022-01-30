//author : QUentin Berthet
const VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute vec4 a_Color;\n' +
    'uniform mat4 u_mat;\n' +

    'varying vec4 v_Color;\n' +

    'void main() {\n' +
    '  gl_Position = u_mat * a_Position ;\n' +
    '  v_Color = a_Color;\n' +
    '}\n';


const FSHADER_SOURCE =
    'precision mediump float;\n' +
    'varying vec4 v_Color;\n' +

    'void main() {\n' +
    '  gl_FragColor = v_Color;\n' +
    '}\n';




function main() {

    const canvas = document.getElementById('my-canvas');


    const gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('Failed to get the displaying context for WebGL');
        return;
    }


    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to intialize shaders.');
        return;
    }


    const len = initVertexBuffers(gl);
    if (len < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
    }

    gl.clearColor(0.75, 0.85, 0.8, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.frontFace(gl.CCW);
    gl.cullFace(gl.BACK);


    var u_mat = gl.getUniformLocation(gl.program, 'u_mat');

    var mat_cam = new Matrix4();


    var viewProjMatrix = new Matrix4();
    viewProjMatrix.setPerspective(100.0, 1.0, 1.0, 1000.0);
    viewProjMatrix.lookAt(1.0, 5.0, 5.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);

    var vals = [0.0, 0.0];
    ObjectManager(vals);

    var display = function() {
        mat_cam.set(viewProjMatrix);
        mat_cam.rotate(vals[0], 1.0, 0.0, 0.0);
        mat_cam.rotate(vals[1], 0.0, 1.0, 0.0);
        gl.uniformMatrix4fv(u_mat, false, mat_cam.elements);


        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.drawArrays(gl.TRIANGLES, 0, len);

        mat_cam.translate(0, 3.0, -4)
        mat_cam.rotate(180, 1.0, 0.0, 0.0);
        gl.uniformMatrix4fv(u_mat, false, mat_cam.elements);
        gl.drawArrays(gl.TRIANGLES, 0, len);


        requestAnimationFrame(display);
    };
    display();
}

function ObjectManager(values) {
    document.onkeydown = (ev) => {
        v = 10;
        switch (ev.key) {
            case 'ArrowDown':
                values[0] += v;
                break;
            case 'ArrowUp':
                values[0] -= v;
                break;
            case 'ArrowRight':
                values[1] += v;
                break;
            case 'ArrowLeft':
                values[1] -= v;
                break;
        }
    };
}


function initVertexBuffers(gl) {

    let vertices = new Float32Array([

        // Front
        -2, -1.5, 0, 0, 1, 0, -1, 1.5, -1, 0, 1, 0,
        0, -1.5, 0, 0, 1, 0,

        -1, 1.5, -1, 0, 1, 0,
        0, -1.5, 0, 0, 1, 0,
        1, 1.5, -1, 0, 1, 0,

        0, -1.5, 0, 0, 1, 0,
        1, 1.5, -1, 0, 1, 0,
        2, -1.5, 0, 0, 1, 0,

        // Back
        -2, -1.5, -4, 1, 0, 1, -1, 1.5, -3, 1, 0, 1,
        0, -1.5, -4, 1, 0, 1,

        -1, 1.5, -3, 1, 0, 1,
        0, -1.5, -4, 1, 0, 1,
        1, 1.5, -3, 1, 0, 1,

        0, -1.5, -4, 1, 0, 1,
        1, 1.5, -3, 1, 0, 1,
        2, -1.5, -4, 1, 0, 1,

        // Left
        -2, -1.5, -4, 1, 1, 0, -1, 1.5, -3, 1, 1, 0, -2, -1.5, -2, 1, 1, 0,

        -1, 1.5, -3, 1, 1, 0, -2, -1.5, -2, 1, 1, 0, -1, 1.5, -1, 1, 1, 0,

        -2, -1.5, -2, 1, 1, 0, -1, 1.5, -1, 1, 1, 0, -2, -1.5, 0, 1, 1, 0,

        // Right
        2, -1.5, -4, 1, 0, 1,
        1, 1.5, -3, 1, 0, 1,
        2, -1.5, -2, 1, 0, 1,

        1, 1.5, -3, 1, 0, 1,
        2, -1.5, -2, 1, 0, 1,
        1, 1.5, -1, 1, 0, 1,

        2, -1.5, -2, 1, 0, 1,
        1, 1.5, -1, 1, 0, 1,
        2, -1.5, -0, 1, 0, 1,

        // top
        -1, 1.5, -1, 1, 0, 0.5, -1, 1.5, -3, 1, 0, 0.5,
        0, 1.5, -1, 1, 0, 0.5,

        -1, 1.5, -3, 1, 0, 0.5,
        0, 1.5, -1, 1, 0, 0.5,
        1, 1.5, -3, 1, 0, 0.5,

        0, 1.5, -1, 1, 0, 0.5,
        1, 1.5, -3, 1, 0, 0.5,
        1, 1.5, -1, 1, 0, 0.5,

        // ground
        -2, -1.5, 0, 0.5, 1, 0, -2, -1.5, -4, 0.5, 1, 0,
        0, -1.5, 0, 0.5, 1, 0,

        -2, -1.5, -4, 0.5, 1, 0,
        0, -1.5, 0, 0.5, 1, 0,
        2, -1.5, -4, 0.5, 1, 0,

        0, -1.5, 0, 0.5, 1, 0,
        2, -1.5, -4, 0.5, 1, 0,
        2, -1.5, 0, 0.5, 1, 0

    ]);

    const len = vertices.length / 6;

    const vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);


    const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return -1;
    }
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 24, 0);
    gl.enableVertexAttribArray(a_Position);

    var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    if (a_Color < 0) {
        console.log('Failed to get the storage location of a_Color');
        return -1;
    }

    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 24, 12);
    gl.enableVertexAttribArray(a_Color);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return len;
}