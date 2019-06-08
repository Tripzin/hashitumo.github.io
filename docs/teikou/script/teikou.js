$(function(){

    var win_w = window.innerWidth;
    var win_h = window.innerHeight;
    var aspect = win_w/win_h;
    if (aspect > 1){
        $(".buttons").css("margin-top",'30%');
        $('.all').css("height","5%");
        $(".buttons").remove();
    }
    else{
        $(".buttons").css("margin-top","16%");
        $('.all').css("height","17%");
        $(".buttons > div").css("height","20%");
    }

    function calom(nums){
        var diti = parseInt(nums[0]-1);
        var dni = parseInt(nums[1]-1);
        var dsan = parseInt(nums[2]-1);
        var dyon = parseInt(nums[3]-1);

        switch(dsan){
            case 7:
                dsan = -1;
                break;
            case 8:
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
            case 4:
                dyon = 20;
        }

        return String(Math.floor((diti*10+dni)*10**dsan*10)/10)+'Ω 誤差±'+dyon+"%";
    }
    /**ドラムロールの設定 */
    var num_list = [];
    var color_list_ty0 = ['black','brown','red','orange','yellow',
                      'green','blue','magenta','gray','white'];
    var color_list_ty1 = ['brown','red','gold','silver','snow'];

    var color_list_ty2 = ['black','brown','red','orange','yellow',
    'green','blue','gold','silver'];

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

    //ボタンを押して任意の数だけドラムロールを回すことができるかテスト
    
    //第1桁～第4桁
    $("#dram").children('div').each(function(index){
        $(this).flickEndless({
            vertical: true,
            increment:5,
            ratio:3
            ,
            onPageChange: function(){
                num_list[index] = this.page;
                var ans = calom(num_list);
                $('.ans').html(ans);
            }    
        });
        
        
    });
    /**4つの目の要素のinnerHTMLはインデックスとしてそのまま使用できない */
    var dyons_num = {"±1":0,"±2":1,"±5":2,"±10":3,"±20":4};
    var mtpos,drampos;
    $(".buttons").children('div').each(function(ind){
            $(this).children('li').children('a').each(function(index){
                $(this).on('click touchstart',function(){
                /**
                 move_amount
                ドラムの位置がdramposでボタンを押してmtposに移動したいとき、
                moveamount = mtpos - dramposになる
                */
                    drampos = num_list[ind] - 1;

                    if(ind != 3){
                    mtpos = parseInt($(this)[0].innerHTML);
                    }
                    else{
                        mtpos = dyons_num[$(this)[0].innerHTML];
                    }


                    var move_amount =  mtpos - drampos;
                    if (move_amount > 0){
                        $('.guru').eq(ind).flickEndless('next',move_amount);
                    }
                    else if(move_amount < 0){
                        $('.guru').eq(ind).flickEndless('prev',-move_amount);
                    }
                    return false;
                });
            });
        });
   
    //IOS用の設定
    function prevent(e){
        event.preventDefault();
    }
    //document.addEventListener("touchstart",prevent,{passive:false});
    document.addEventListener("touchmove",prevent,{passive:false});
    document.addEventListener("touchend",prevent,{passive:false});
    document.addEventListener("gesturestart",prevent,{passive:false});
    document.addEventListener("gesturechange",prevent,{passive:false});
    document.addEventListener("gestureend",prevent,{passive:false});
  

});
