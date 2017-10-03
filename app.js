
// read every file in a directory
const fs = require('fs');

// the directory where our files live
let dir = './posts';
let build_dir = "./build";

// fs.readdir returns an array of files in the directory
fs.readdir(dir, (err, files) => {
  if (err) console.log(err)
  // use forEach() to loop over the files
  files.forEach((file) => {
    // read the files, we need to provide the directory again as the array only contains file names
    let data = fs.readFile(`${dir}/${file}`, 'utf8', (err, data) => {
        if (err) console.log(err)
      // console.log(data)
    
    let template = `
        <html>
          <body>
            <div><p>${data.replace("\n","</p><p>")}</p></div>
          </body>
        </html>
        `
        
        let s = file.split('_',2);
        let s1 = s[1].split('.',1);
       
        fs.writeFile(`${build_dir}/page_`+s1+'.html', template.trim(), 'utf8', (err) => {
          if (err) console.log(err)
          
        })
    })  
  })
})

// fs.readdir returns an array of files in the directory
fs.readdir(build_dir, (err, files) => {
  if (err) console.log(err)
  
  let data=``;
  for(let j=0;j<files.length;j++){
    let s = files[j].split('_',2);
        let s1 = s[1].split('.',1);
    data += `<a href="../build/`+files[j]+`"><li>Post `+s1+`</li></a>`
    
  }
  
    let template = `
        <html>
        <style type="text/css">
          body{
            width: 60%;
            margin: 20%;
          }
          ul{
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
	          align-items: center;
	          text-align: center;
	          margin: 0;
	          padding: 0;
	          text-decoration: none;
          }
          ul li{
            text-decoration: none;
            list-style-type: none;
            background-color: aliceblue;
            color: black;
	          box-shadow: 0 0 20px black;
            flex-basis : 100%;
            width: 100px;
            margin: 5%;
            height : 50px;
            
          }
            ul li a{
              display: flex;
              justify-content: center;
              align-items: center;
              color: black;
              flex-basis : 80%;
              
            }
        </style>
          <body>
            <div>
            <h1>Posts</h1>
            <ul>${data}</ul>
            </div>
          </body>
        </html>
        `
        
       
        fs.writeFile(`templates/index.html`, template.trim(), 'utf8', (err) => {
          if (err) console.log(err)
          
        })
})

console.log("To add new post, make a .txt file under posts directory by name post_nameOfPost.txt(example post_five.txt)");