// Vertex shader program
const VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute vec4 a_Color;\n' + // Attribute variable color to bind the effective vertex color from the model data

    'varying vec4 v_Color;\n' + // Varying variable color to pass the vertex color to the fragment shader

    'void main() {\n' +
    '  gl_Position = a_Position;\n' +
    '  v_Color = a_Color;\n' + // Set the varying color value with the attribute color value
    '}\n';


// le varaing mecha qui perm,et de transfere val du vshader vers le fshader-> mais pas une copie c'est une interpolation linéaire de ces 3  valeur (3 varaing pour 60 fragment donc chaque fragment recéupère une interpolation des ces 3 valeur en fonction de leur distace au fragment)


// Fragment shader program
const FSHADER_SOURCE =
    'precision mediump float;\n' + // This determines how much precision the GPU uses when calculating floats
    'varying vec4 v_Color;\n' + // Varying variable color to get the vertex color from
    // The vertex shader (!!same name as in the vertex shafer)
    'void main() {\n' +
    '  gl_FragColor = v_Color;\n' + // Set the fragment color with the vertex shader
    '}\n';

function main() {
    // Retrieve <canvas> element
    const canvas = document.getElementById('my-canvas');

    // Get the rendering context for WebGL
    const gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    // Initialize shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to intialize shaders.');
        return;
    }

    // Write the positions of vertices to a vertex shader
    const n = initVertexBuffers(gl);
    if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
    }

    // Specify the color for clearing <canvas>
    gl.clearColor(1, 1, 1, 1);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw the vertext buffer using triangles
    gl.drawArrays(gl.TRIANGLES, 0, n);
}


function initVertexBuffers(gl) {
    // This is our model. It is a simple triangle. Each vertex of the triangle is defined
    // by its coordinate (two floats x and y): (0, 0.5), (-0.5, -0.5) and (0.5, -0.5)
    const vertices = new Float32Array(
        [
            /**/
            /*1*/
            /**/
            -0.6, 0.4, 1.0, 0.0, 0.0,
            /**/
            -0.6, -0.4, 1.0, 0.0, 0.0,
            /**/
            -0.4, 0.4, 1.0, 0.0, 0.0,
            /**/
            /*2*/
            /**/
            -0.4, 0.4, 0.0, 1.0, 0.0,
            /**/
            -0.6, -0.4, 0.0, 1.0, 0.0,
            /**/
            -0.4, -0.4, 0.0, 1.0, 0.0,
            /**/
            /*3*/
            /**/
            -0.6, -0.4, 0.0, 1.0, 1.0,
            /**/
            -0.4, -0.4, 0.0, 1.0, 1.0,
            /**/
            -0.4, -0.6, 0.0, 1.0, 1.0,
            /**/
            /*4*/
            /**/
            -0.6, 0.4, 1.0, 1.0, 0.0,
            /**/
            -0.4, 0.6, 1.0, 1.0, 0.0,
            /**/
            -0.4, 0.4, 1.0, 1.0, 0.0,
            /**/
            /*5*/
            /**/
            0.4, -0.4, 1.0, 0.0, 1.0,
            /**/
            -0.4, -0.4, 1.0, 0.0, 1.0,
            /**/
            -0.4, -0.6, 1.0, 0.0, 1.0,
            /**/
            /*6*/
            /**/
            0.4, 0.4, 1.0, 0.0, 0.0,
            /**/
            -0.4, 0.6, 1.0, 0.0, 0.0,
            /**/
            -0.4, 0.4, 1.0, 0.0, 0.0,
            /**/
            /*7*/
            /**/
            0.4, -0.4, 0.0, 1.0, 0.0,
            /**/
            0.4, -0.6, 0.0, 1.0, 0.0,
            /**/
            -0.4, -0.6, 0.0, 1.0, 0.0,
            /**/
            /*8*/
            /**/
            0.4, 0.4, 1.0, 1.0, 0.0,
            /**/
            -0.4, 0.6, 1.0, 1.0, 0.0,
            /**/
            0.4, 0.6, 1.0, 1.0, 0.0,
            /**/
            /*9*/
            /**/
            0.4, -0.4, 0.0, 0.0, 1.0,
            /**/
            0.4, -0.6, 0.0, 0.0, 1.0,
            /**/
            0.6, -0.4, 0.0, 0.0, 1.0,
            /**/
            /*10*/
            /**/
            0.4, 0.4, 1.0, 0.0, 0.0,
            /**/
            0.6, 0.4, 1.0, 0.0, 0.0,
            /**/
            0.4, 0.6, 1.0, 0.0, 0.0,
            /**/
            /*11*/
            /**/
            0.4, -0.4, 1.0, 0.0, 1.0,
            /**/
            0.4, -0.2, 1.0, 0.0, 1.0,
            /**/
            0.6, -0.4, 1.0, 0.0, 1.0,
            /**/
            /*12*/
            /**/
            0.4, 0.4, 0.0, 1.0, 0.0,
            /**/
            0.6, 0.4, 0.0, 1.0, 0.0,
            /**/
            0.4, 0.2, 0.0, 1.0, 0.0,
            /**/
            /*11*/
            /**/
            0.6, -0.2, 0.0, 1.0, 1.0,
            /**/
            0.4, -0.2, 0.0, 1.0, 1.0,
            /**/
            0.6, -0.4, 0.0, 1.0, 1.0,
            /**/
            /*12*/
            /**/
            0.6, 0.2, 1.0, 0.0, 0.0,
            /**/
            0.6, 0.4, 1.0, 0.0, 0.0,
            /**/
            0.4, 0.2, 1.0, 0.0, 0.0
        ]);
    const n = 42; // The number of vertices

    // Create a buffer object
    const vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return -1;
    }
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 20, 0);
    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    // Get the storage location of a_Color, assign buffer and enable
    var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    if (a_Color < 0) {
        console.log('Failed to get the storage location of a_Color');
        return -1;
    }
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 20, 8);
    // Enable the assignment to a_Color variable
    gl.enableVertexAttribArray(a_Color);

    // Unbind the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return n;

    return n;
}
/*
TODO:
 1. Create a WebGL buffer object
 2. Bind the created buffer object
 3. Write data into the buffer object
 4. Bind shader programs attributes with javascript variables.
    example: if you have an attribute named "a_color", you should
    call "const varName = gl.getAttribLocation(gl.program, 'a_color');"
    then "gl.vertexAttribPointer" and "gl.enableVertexAttribArray"
 */