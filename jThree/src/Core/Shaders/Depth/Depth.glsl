precision mediump float;
uniform mat4 matMVP;
varying vec4 v_pos;
void main()
{
   //float depth=v_pos.z/v_pos.w;
   //float r = depth;
   // float g = fract(r * 255.0);
   // float b = fract(g * 255.0);
   // float a = fract(b * 255.0);
   // float coef = 1.0 / 255.0;
   // r -= g * coef;
   // g -= b * coef;
   // b -= a * coef;
   // gl_FragColor=vec4(r, g, b, a);
    gl_FragColor=vec4(1,0,0,1);
}
