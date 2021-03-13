document.getElementById("button").onclick = function () {
  //クリックしてスタート
  //facebook-jsonを取得して表示
  let count = 0;
  const limit = 50; //表示件数
  const graph_api = 'https://graph.facebook.com/ig_hashtag_search?';
  const accessToken = 'EAAnGQ8kLkaUBAIY8dCfTvIYYri2LE322JrPErhftRqOj2GCyyil045DGekgaH6KYkNotsKASgDlPw6e4ZAtLxMhfuH4ZAwsj0E20p2ifYBmHxinZCdT7TKmILcLcZBnf8zUANt6EuLLlcH6wByM8uSG2AedtUluQUToTAYcgXBKzteGkmeadzXsYEC9kmHcZD'; // アクセストークン
  const businessID = '17841441477914224'; //グラフAPIエクスプローラで取得したinstagram_business_accountのID
  let text = '';
  let hashtag = [];
  let input_message = [];
  input_message = document.getElementById("input_message").value; //テキストボックス内のキーワードを格納
  // console.log(input_message[5]);
  hashtag = input_message.split(/\s+/);
  console.log(hashtag);
  console.log(hashtag.length);
  // console.log(hashtag[0]);
  

  //promise.allを使って投稿検索を非同期処理する必要！
  // 非同期処理の定義

  function func1(t) {
    // console.log(new Date());
    console.log(t);

    return new Promise(function (resolve, reject) {

      const url0 = graph_api + "user_id=" + businessID + "&q=" + t + "&access_token=" + accessToken;
      var dataId;
      var dataMedia;
      //タグID検索
      fetch(url0)
        .then((response) => {
          return response.json() //ここでBodyからJSONを返す
          
        })
        .then((result) => {
          console.log(result);
          dataId = result;

          console.log(dataId.data[0].id);
          const url1 = 'https://graph.facebook.com/'
          const url2 = '/recent_media?user_id=' + businessID + '&fields=media_url,permalink&limit=' + limit + '&access_token=' + accessToken;
          const url3 = url1 + dataId.data[0].id + url2;

          console.log(url3);

          fetch(url3)
            .then((response) => {
              return response.json()
            })

            .then((result) => {
              console.log(result);
              dataMedia = result;

              //after
              const after = dataMedia.paging.cursors.after;
              console.log(after);
              const url4 = url1 + dataId.data[0].id + '/recent_media?user_id=' + businessID + '&fields=media_url,permalink&limit=' + limit + 'after=' + after + '&access_token=' + accessToken;

              fetch(url4)
                .then((response) => {
                  return response.json()
                })

                .then((result) => {
                  console.log("after")
                  console.log(result);
                  Array.prototype.push.apply(dataMedia.data, result.data);
                  console.log(dataMedia);


                  for (let i = 0; i < 100; i++) {
                    // console.log(i);
                    text1 = '<li><a href="' + dataMedia.data[i].permalink + '" target="_blank">';
                    text2 = '<img src="' + dataMedia.data[i].media_url + '">';
                    text3 = '</a></li>';
                    text = text + text1 + text2 + text3;
                  }
  
                  $('#instagram-list').html(text);
                })

                .catch((e) => {
                  console.log(e) //エラーをキャッチし表示     
                })

                // for (let i = 0; i < limit; i++) {
                //   // console.log(i);
                //   text1 = '<li><a href="' + dataMedia.data[i].permalink + '" target="_blank">';
                //   text2 = '<img src="' + dataMedia.data[i].media_url + '">';
                //   text3 = '</a></li>';
                //   text = text + text1 + text2 + text3;
                // }

                // $('#instagram-list').html(text);



            })

            .catch((e) => {
              console.log(e) //エラーをキャッチし表示     
            })



        })
        .catch((e) => {
          console.log(e) //エラーをキャッチし表示     
        })
    })
  }



if (hashtag.length == 2) {
  console.log(hashtag);
  Promise.all(hashtag.map(function (tag) {
      // console.log(tag);
      // return func1(tag);
      return new Promise(resolve => {
        return func1(tag)
          .then(result => {
            resolve(result);
          });
        // setTimeout(() => {
        //   console.log(new Date());
        //   console.log(tag);
        //   resolve(tag);
        // },3000)
      })

    }))
    .then((result) => {
      console.log(result);
    })
    .catch((result) => {
      console.log(result);
    });
}





//   //id比較
//   // ハッシュタグ複数の場合
//   let NewResult = [];
//   // if(hashtag.length > 1){

//   //   for(let i=0;i<limit;i++){
//   //       filteredResult[i] = results1[0][i];
//   //   }
//   //   let flag = 0;
//   //   for(let cnt=0;cnt<limit;cnt++){
//   //     for(let i=0;i<hashtag.length-1;i++){
//   //       for(let j=0;j<limit;j++){
//   //         // console.log(results);
//   //         // console.log(i+1);
//   //         // console.log(results[i+1]);
//   //         if(filteredResult[cnt].id == results1[i+1][j].id){
//   //           flag = 1;
//   //         }
//   //        }
//   //     }
//   //     if(flag == 1){
//   //       NewResult.push(filteredResult[cnt]);
//   //     }
//   //     flag = 0;
//   //   }
//   //   //console.log(NewResult);

//   // console.log(NewResult);
//   // //表示
//   //   for(let i=0; i<NewResult.length;i++) {
//   //     console.log(i);
//   //     text1 = '<li><a href="'+NewResult[i].permalink+'" target="_blank">';
//   //     text2 = '<img src="'+NewResult[i].media_url+'">';
//   //     text3 = '</a></li>';
//   //     text = text + text1 + text2 + text3;
//   //     //console.log(NewResult[i]);
//   //   console.log(NewResult[i].permalink);

//   //   }
//   // }
//   //ハッシュタグひとつの場合
//   // else{
//   for (let i = 0; i < limit; i++) {
//     NewResult.push(results1[0][i]);
//   }


  // console.log(NewResult);
  // //表示
  // for (let i = 0; i < limit; i++) {
  //   console.log(i);
  //   text1 = '<li><a href="' + NewResult[i].permalink + '" target="_blank">';
  //   text2 = '<img src="' + NewResult[i].media_url + '">';
  //   text3 = '</a></li>';
  //   text = text + text1 + text2 + text3;


  // }
  // }

  // console.log(text);
  // $('#instagram-list').html(text);
}