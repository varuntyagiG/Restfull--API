const express = require("express");
const app = express();

let port = 3000;
const path = require("path");

const { v4: uuidv4 } = require('uuid'); // package for create random id
uuidv4();

var methodOverride = require('method-override');

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set('views',path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname,'public')));

let posts = [
    {
        id : uuidv4(),
        username : "varun tyagi",
        content : "i love coding"
    },
    {
        id : uuidv4(),
        username : "arjun",
        content : "hard work is key to sucess!"
    },
    {
        id : uuidv4(),
        username : "Jauhar",
        content : "push overselves to big some new!"
    }
]
app.listen(port,()=>{
    console.log("req. listen along the port : 3000");
});
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("form.ejs");
});

app.post("/posts",(req,res)=>{
    let{username , content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id );
    console.log(post);
    res.render("show.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{
    let { id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id );
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});
app.get("/posts/:id/edit",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id );
    res.render("edit.ejs",{post});
    console.log(content);
});

app.delete("/posts/:id",(req,res)=>{
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id );
    res.redirect("/posts");
})