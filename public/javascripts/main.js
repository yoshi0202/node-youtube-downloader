$(document).ready( function(){
    //初期設定
    let path = "http://" + location.hostname + ":3000/";
    let errflg = false;
    let client_errmsg = "";

    //Program実行処理
    $('#program_exec').click(function(){
        //クライアント確認
        $('#error_field p').remove();
        //URL入力判定
        if(!$("#download_url").val()){
            client_errmsg = "<p>URLを入力してください。";
            $('#error_field').append(client_errmsg);
            return;
        }
        //メタデータ入力判定
        if(!$("#artist_name").val() || !$("#album_name").val() || !$("#song_name").val()){
            client_errmsg = "<p>メタデータを正しく入力してください。";
            $('#error_field').append(client_errmsg);
            return;
        }
        //ノーマライズ入力判定
        if($('.checkbox:checked').val() === "1" && !$("#volume").val()){
            client_errmsg = "<p>ノーマライズボリュームを入力してください。";
            $('#error_field').append(client_errmsg);
            return;
        }
        //すべての判定にクリア時、サーバ処理に繋げる
        if(errflg != true){
            //ダウンロード処理
            let download_url = $("#download_url").val();
            $.ajax({
                url : path +"download",
                type : "POST",
                data : {
                    download_url : download_url
                },
                dataType: 'text',
                async: false
            }).done(function(data){
                //ダウンロード処理終了
            }).fail(function(err){
                alert("ダウンロードに失敗:" + err)
                errflg = true;
            });
        }
        if(errflg != true){
            //メタデータ更新処理
            let artist_name = $("#artist_name").val();
            let album_name = $("#album_name").val();
            let song_name = $("#song_name").val();
            $.ajax({
                url : path + "update",
                type : "POST",
                data : {
                    artist_name : artist_name,
                    album_name : album_name,
                    song_name : song_name
                },
                dataType: 'text',
                async: false
            }).done(function(result){
                //メタデータ更新処理終了
            }).fail(function(err){
                alert("メタデータ更新に失敗:" + err);
                errflg = true;
            });
        }
        if(errflg != true && $('.checkbox:checked').val() === "1" ){
            //ノーマライズ処理
            let volume = $("#volume").val();
            $.ajax({
                url : path + "normalize",
                type : "POST",
                data : {
                    volume: volume
                },
                dataType: 'text',
                async: false
            }).done(function(result){
                //ノーマライズ処理終了
            }).fail(function(err){
                alert("ノーマライズ処理に失敗:" + err);
                errflg = true;
            });
        }
        if(errflg != true){
            //フォルダ移動、リネーム処理
            let artist_name = $("#artist_name").val();
            let album_name = $("#album_name").val();
            let song_name = $("#song_name").val();
            $.ajax({
                url : path + "rename",
                type : "POST",
                data : {
                    artist_name : artist_name,
                    album_name : album_name,
                    song_name : song_name
                },
                dataType: 'text',
                async: false
            }).done(function(result){
                //フォルダ移動、リネーム処理終了
            }).fail(function(err){
                alert("リネーム処理失敗:" + JSON.stringify(err));
                errflg = true;
            });
        }
        //処理終了のためerrflgを戻す
        errflg = false;
        alert("ダウンロード完了");
    });
    
    //検索機能
    $('#search').click(function(){
        let search_artist = $("#search_artist").val();
        let search_songname = $("#search_songname").val();
        $("#spacer_search_field p").remove();
        if(!search_artist && !search_songname){
            $("#spacer_search_field").append("<p>どちらか一つは入力してください。<p>");
            return;
        }
        $.ajax({
            url : path + "search",
            type : "POST",
            data : {
                search_artist : search_artist,
                search_songname : search_songname
            },
            dataType: 'text'
        }).done(function(data){
            let data_obj = (new Function("return " + data))();
            let result_rows_count = data_obj.length;
            alert("結果" + result_rows_count + "件ヒットしました");
            if(!result_rows_count){
                //結果0件のためreturn
                return;
            }else{
               if($("#result_field ul").length != '0'){
                    $("#result_field ul").remove();
                }
                let html = "";
                for(i=0; i<result_rows_count; i++){
                    let album_artist_name = data_obj[i].album_artist_name;
                    let album_title = data_obj[i].album_title;
                    html += "<ul class='open_h3 btn-5'data-albumno=" + i + ">" + 
                            "<p id='album_artist_name'>" + album_artist_name + "</p>" + 
                            "<p>   -   </p>" + 
                            "<p id='album_title'>" + album_title + "</p></ul>" +
                            "<ul class='ul_open open-5'>";
                    for(n=0; n<data_obj[i].tracks.length; n++){
                        let song_name = data_obj[i].tracks[n].track_title;
                        let track_number = zeroPadding(n+1,2);
                        html += "<li data-albumno=" + i + ">" +
                                "<p id='track_number'>" + track_number + "</p>" + 
                                "<p>   -   </p>" +
                                "<p id='track_name'>" + song_name +"</p></li>";
                    }
                    html += "</ul>";
                }
                $("#result_field").append(html);
                $('.open-5').each(function(){
                    $(this).css("height",$(this).height()+"px");
                });
                $('.open-5').hide();
            }
        }).fail(function(XMLHttpRequest, textStatus, errorThrown){
            //err
            alert("エラーが発生しました");
        });
   });

    //検索結果目選択時
    $(document).on('click', '#result_field ul li', function(){
        let song_name = $(this).children('p#track_name').html();
        let albumno = $(this).data('albumno');
        let album_artist_name = $("#result_field ul[data-albumno=" + albumno + "] #album_artist_name").html();
        let album_title = $("#result_field ul[data-albumno=" + albumno + "] #album_title").html();
        $('#artist_name').val(album_artist_name);
        $('#album_name').val(album_title);
        $('#song_name').val(song_name);
    });

    $('#volume_filed label').click(function(){
        checkbox_val = $(this).html();
        if(checkbox_val == "Yes"){
            $('#target_on').css('display','block');
        }else{
            $('#target_on').css('display','none');
        }
    });
 });
     

function zeroPadding(num,length){
    return ('0000000000' + num).slice(-length);
}