$(function(){
    
        function calom(nums){
            var diti = parseInt(nums[0]-1);
            var dni = parseInt(nums[1]-1);
            var dsan = parseInt(nums[2]-1);
            var dyon = parseInt(nums[3]-1);
    
            switch(dsan){
                case 10:
                    dsan = -1;
                    break;
                case 11:
                    dsan = -2;
                    break;
            }
    
            //誤差範囲
            switch(dyon){
                case 0:
                    dyon = 1;
                    break;
                case 1:
                    dyon = 2;
                    break;
                case 2:
                    dyon = 5;
                    break;
                case 3:
                    dyon = 10;
                    break;
                case 4:
                    dyon = 20;
                    break;
            }

            ans = Math.floor((diti*10+dni)*10**dsan*100)/100;
            //キロ、メガの表記
            if ((dsan >= 2) && (dsan <= 4)){
                ans = String(ans/(10**3)) + "K";

            }
            else if(dsan >= 5){
                ans = String(ans/(10**6)) + "M"; 
            }
    
            return ans +'Ω ±'+dyon+"%";
        }
        /**ドラムロールの設定 */
        var used_values = [];
        var color_list_ty0 = ['black','brown','red','orange','yellow',
                          'green','#0e72cf','magenta','gray','white'];
        var color_list_ty1 = ['brown','red','gold','silver','snow'];
    
        var color_list_ty2 = ['black','brown','red','orange','yellow',
        'green','#0e72cf','magenta','gray','white','gold','silver'];
    
        $('.dram0').children('li').each(function(index){
            $(this).css('background',color_list_ty0[index]);
            $('.dram0_button').children('li').eq(index).css("background",color_list_ty0[index]);    
        });

        $('.dram1').children('li').each(function(index){
            $(this).css('background',color_list_ty0[index]);
            $('.dram1_button').children('li').eq(index).css("background",color_list_ty0[index]);    
        });

        $('.dram2').children('li').each(function(index){
            $(this).css('background',color_list_ty2[index]);
            $('.dram2_button').children('li').eq(index).css("background",color_list_ty2[index]);
        });
        
        $('.dram3').children('li').each(function(index){
            $(this).css('background',color_list_ty1[index]);
            $('.dram3_button').children('li').eq(index).css("background",color_list_ty1[index]);
        });
    
        //第1桁～第4桁
        $('.endless-flick').each(function(index){
            $(this).flickEndless({
                vertical: true,
                increment:5,
                ratio:3,
                onPageChange: function(){
                    used_values[index] = this.page;
                    var ans = calom(used_values);
                    $('.ans_write').html(ans);
                }    
            });
            
            
        });

        /**4つの目の要素のinnerHTMLはインデックスとしてそのまま使用できない */
        var dyons_num = {"±1":0,"±2":1,"±5":2,"±10":3,"±20":4};
        var mtpos,drampos;
        console.log( $(".buttons td"));
        $(".buttons td").children("ul").each(function(teikou_colum_num){
                $(this).children("li").children("a").each(function(index){
                    $(this).on("click touchstart touchend",function(){
                        console.log(used_values);
                        console.log(teikou_colum_num);
                    /**
                        move_amount
                        drampos : ドラムの位置
                        mtpos   : 移動したい位置
                        moveamount = mtpos - drampos
                    */
                        drampos = used_values[teikou_colum_num] - 1;
    
                        if(teikou_colum_num != 3){
                            mtpos = parseInt($(this)[0].innerHTML);
                        } else {
                            mtpos = dyons_num[$(this)[0].innerHTML];
                        }
    
                        var move_amount = mtpos - drampos;
                        if (move_amount > 0){
                            $('.endless-flick').eq(teikou_colum_num).flickEndless('next',move_amount);
                        }
                        else if(move_amount < 0){
                            $('.endless-flick').eq(teikou_colum_num).flickEndless('prev',-move_amount);
                        }
                        return false;
                    });
                });
            });

        // パレットの展開
        $(".btn-open-palette").on("click", function(){
            $(this).children('span.material-icons').each(function(index,icons){
                if(icons.innerHTML == 'expand_more'){
                    icons.innerHTML = 'expand_less';
                } else {
                    icons.innerHTML = 'expand_more';
                }
                $(".palette").slideToggle();
            })
        })
       
        //IOS用の設定
        function prevent(e){
            event.preventDefault();
        }
        //document.addEventListener("touchstart",prevent,{passive:false});
        //document.addEventListener("touchmove",prevent,{passive:false});
        //document.addEventListener("touchend",prevent,{passive:false});
        document.addEventListener("gesturestart",prevent,{passive:false});
        document.addEventListener("gesturechange",prevent,{passive:false});
        document.addEventListener("gestureend",prevent,{passive:false});
      
    
    });
    
