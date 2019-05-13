
window.onload = function(){
  class Node{
    constructor(){
      this.key = '=';
      this.child = [];
    }
  }
  print = console.log;
  var forms = document.getElementById("test1");
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext('2d');
  var texts = document.createElement("input");
  texts.type = 'text';
  texts.id = 'textbox';
  texts.value = 'A+B';
  texts.className = 'textboxs';
  var buttons = document.createElement("input");
  buttons.type = 'button';
  buttons.id = 'button';
  buttons.value = '入力';
  buttons.className = 'buttons';
  buttons.onclick = function(){
   display_tree(texts.value);
  }
  forms.insertBefore(texts,canvas);
  forms.insertBefore(buttons,canvas);

  //入力された数式を逆ポーランド表記法に変換する関数
  function change_RPN(string){
    var stc = [];
    var baf = [];
    strs = string.split("");
    for(var i in strs){
      if((strs[i]=='+')||(strs[i]=='-')){
        while (stc.length != 0){
          var c = stc[stc.length-1];
          if((c=='/')||(c=='x')){
            baf.push(stc.pop());
          }else{
            break;
          }
        }
        stc.push(strs[i]);
      }
      else if ((strs[i]=='/')||(strs[i]=='x')||(strs[i]=='(')){
        stc.push(strs[i]);
      }
      else if(strs[i] == ')'){
        var index = stc.indexOf('(');
        var workstack = [];
        for(var j = 0;stc.length-index+1 > j; j++){
          var b = stc.pop();
          if (b != '('){
            workstack.push(b);
          }
          while(workstack.length != 0){
            baf.push(workstack.pop());
          }
        }
      }
      else{
        baf.push(strs[i]);
      }
    } 
    while (stc.length != 0){
      baf.push(stc.pop());
    }
    return baf;
  }
  //木構造に変換する関数
  function create_tree(RPN){
    var stack = [];
    var tree = new Node();
    for(var i=0;RPN.length > i; i++){
      if ((RPN[i]=='x')||(RPN[i]=='+')||(RPN[i]=='/')||(RPN[i]=='-')){
        //print(RPN[i]);
        var a = stack.pop();
        var b = stack.pop();
        //print(b);
        //print(a);
        tree = tree_insert(a,b,RPN[i],tree);
        stack.push(tree);                                            
        // print(stack);
      }
      else{
        stack.push(RPN[i]);
      }
    }
    return stack;
  }
  
  function tree_insert(ax,bx,type,T){
    var chil = new Node();
    chil.child.push(bx,ax);
    chil.key = type;
    T = chil;
    return T;
  }
  function draw_arc(arc_x,arc_y,text){  
    context.beginPath(); 
    context.lineWidth = '8';
    context.arc(arc_x,arc_y,30,0,Math.PI*2,true);  
    context.strokeStyle = '#060608'; //線の色
    context.stroke();//これ書かないとだめ

    context.fillStyle = '#eae3e3';
    context.fill();
    
    context.font = '40px "VNoto Sans JP", "sans-serif"';
    context.fillStyle = '#000';
    context.textAlign = 'center';
    context.fillText(text,arc_x,arc_y+15);
  }
  
  function draw_rect(rect_x,rect_y,text){
    context.beginPath();
    context.fillStyle = '#eae3e3';
    context.fillRect(rect_x-25,rect_y-25,50,50);
50
    context.strokeStyle = '#060608'; //線の色
    context.lineWidth = '4';
    context.strokeRect(rect_x-25,rect_y-25,50,50);
    
    
    context.font = "40px serif";
    context.fillStyle = '#060608';
    context.textAlign = 'center';
    context.fillText(text,rect_x,rect_y+15);
  }
  
  function tree_print(T,tree_x,tree_y,depth){
    var magic_num = 400/((depth+1)*2);
    //終了判定
    if(T.child == undefined){
      return;
    }else{
      if (depth==0){
        print(depth);
        print(T.key);
        draw_rect(tree_x,tree_y,T.key);
      /*頭悪い*/
      context.beginPath();
      context.strokeStyle = '#060608'; //線の色
      context.lineWidth = '4';
      context.moveTo(tree_x,tree_y+25);
      context.lineTo(tree_x+magic_num,(depth+1)*100);
      context.stroke();
      context.moveTo(tree_x,tree_y+25);
      context.lineTo(tree_x-magic_num,(depth+1)*100);
      context.stroke();
      
      print("a="+T.child[0].key); 
      if((T.child[0].key=='x')||(T.child[0].key=='+')||(T.child[0].key=='/')||(T.child[0].key=='-')){
        draw_rect(tree_x-magic_num,(depth+1)*100,T.child[0].key);
      }
      else if (typeof T.child[0]=='string'){
        draw_arc(tree_x-magic_num,(depth+1)*100,T.child[0]);
        
      }
      if((T.child[1].key=='x')||(T.child[1].key=='+')||(T.child[1].key=='/')||(T.child[1].key=='-')){
        draw_rect(tree_x+magic_num,(depth+1)*100,T.child[1].key);
      }
      else if (typeof T.child[1]=='string'){
        draw_arc(tree_x+magic_num,(depth+1)*100,T.child[1]);
        
      }
    }
    depth += 1;
    if(typeof T.child[0] != undefined){
      tree_print(T.child[0],tree_x-magic_num,100*depth,depth);
    }
    if(typeof T.child[1] != undefined){
      tree_print(T.child[1],tree_x+magic_num,100*depth,depth);
    }
  }
  function display_tree(inputs_shiki){
    //描画を初期化
    context.clearRect(0,0,canvas.width,canvas.height);
    if (inputs_shiki != undefined){
      var ans = change_RPN(inputs_shiki);    
      var treex = create_tree(ans);
      tree_print(treex[0],x_tree=canvas.width/2,y_tree=0,depth=0)
    }
  }
  
}//window.onload
