let allData = {
    personAccaunt: [
      {
        firstName: "Ismoiljon",
        lastName: "Abdulloev",
        login: "abdulloev.19",
        posts: [
          {
            photoSrc: "",
            title: "Описание...",
            like: 0,
            soundname: "Оригинальная аудиодорожка",
            comment: [
              {
                accauntLogin: "",
                commentAccaunt: "",
              },
            ],
          },
        ],
      },
    ],
  };





 


  // if (!proverka) {
  //   const hash = crypto
  //     .createHmac("sha256", userPassword)
  //     .update("I love cupcakes")
  //     .digest("hex");
  //   let user = {
  //     login: userLogin,
  //     password: hash,
  //   };

  //   users.push(user);
  //   data = JSON.stringify(users);
  //   // перезаписываем файл с новыми данными
  //   fs.writeFileSync("JSON/allusers.json", data);
  //   console.log("Account created");
  // }

  // добавляем пользователя в массив
  // users.push(user);
  // перезаписываем файл с новыми данными
  res.send("result");