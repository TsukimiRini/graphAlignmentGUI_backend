var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  // res.send("图对齐网站")
  console.log('get result');
  // nodes_list = [];
  // for(var i = 5; i<10; i++){
  //   var node =new Object;
  //   node.name = ""+i;
  //   node.fx = i*20+i*i;
  //   node.fy = i*20+i*i*i;
  //   node.x = i*i*5;
  //   node.y = i*i*5;
  //   if(i == 9){
  //     node.fx = i*30+i*i;
  //     node.fy = 5*50+i*i;
  //   }
  //   node.uuid = i;
  //   nodes.push(node);
  // }
  // link_list = [];
  // for(var i = 5; i<10; i++){
  //   var lk = new Object;
  //   lk.relation = "relation"+i;
  //   lk.name = i;
  //   lk.sourceid = i;
  //   lk.targetid = i+1;
  //   if(i == 9){
  //     lk.targetid = 5;
  //   }
  //   link_list.push(lk);
  // }

  // var data = {
  //   lgraph_nodes: nodes_list,
  //   lgraph_links: link_list,
  //   rgraph_nodes: nodes_list,
  //   rgraph_links: link_list,
  // };
  // data.error = 0;
  // data.detail="1 : 1";
  // data.acc = "100%";
  // data.time = "0.1s";
  res.json(data);
  
});

router.post('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  // res.send("图对齐网站")
  console.log('post result');
  var child = require('child_process');
  var path = '/Users/guoliang/GraphAlignment/gmt/CItest';
  // console.log("ready to exec");
  // child.exec(`${path} 0 0 "house_1_30_30_del.dot" "house_90_30_30_del.dot"`, (err, stdout, stderr) => {
  //   // console.log(err, stdout, stderr);
  //   console.log(stdout);
  //   res.json(["hello","word"]);

  // });
  console.log(req.body);
  var groupno = req.body.groupno;
  var iscom = req.body.iscom;
  var lpath = req.body.lpath+".dot";
  var rpath = req.body.rpath+".dot";

  child.exec(`${path} ${groupno} ${iscom} ${lpath} ${rpath}`, (err, stdout, stderr) => {
    // console.log(err, stdout, stderr);
    // console.log(stdout);
    var gmtResult = String(stdout);
    // console.log(gmtResult);
    // var ms = gmtResult.split(/\r?\n/);
    // var ms = gmtResult.split(/[(\r\n)\r\n]+/);
    var ms = gmtResult.split('-');
    // console.log(ms);
    var gmt=[];
    for (var i = 0 ;i<ms.length-2;i++) {
      var tmp = ms[i].split(':');
      // console.log(tmp[0].trim(),tmp[1].trim());
      var lnode="";
      var rnode="";
      if((tmp[0].trim())[0] >='0' && (tmp[0].trim())[0]<='9'){
        lnode=tmp[0].trim();
      }else{
        lnode="-1";
      }
      if((tmp[1].trim())[0] >='0' && (tmp[1].trim())[0]<='9'){
        rnode=tmp[1].trim();
      }else{
        rnode="-1";
      }
      gmt.push([lnode,rnode]);
    }
    // console.log(gmt);
    var gmtacc=(ms[ms.length-2].split(':')[1]).trim();
    var gmttime=(ms[ms.length-1].split(':')[1]).trim();
    var result = {
      data:gmt,
      acc:gmtacc,
      time:gmttime
    }
    // console.log(result);
    res.json(result);

  });
  // child.exec(`${path} 2 0 "G_online.dot" "G_offline.dot"`, (err, stdout, stderr) => {
  //   // console.log(err, stdout, stderr);
  //   console.log(stdout);
  //   res.json(["hello","world"]);
  // });
  // console.log("exe completed");
  // nodes_list = [];
  // for(var i = 5; i<10; i++){
  //   var node =new Object;
  //   node.name = ""+i;
  //   node.fx = i*20+i*i;
  //   node.fy = i*20+i*i*i;
  //   node.x = i*i*5;
  //   node.y = i*i*5;
  //   if(i == 9){
  //     node.fx = i*30+i*i;
  //     node.fy = 5*50+i*i;
  //   }
  //   node.uuid = i;
  //   nodes.push(node);
  // }
  // link_list = [];
  // for(var i = 5; i<10; i++){
  //   var lk = new Object;
  //   lk.relation = "relation"+i;
  //   lk.name = i;
  //   lk.sourceid = i;
  //   lk.targetid = i+1;
  //   if(i == 9){
  //     lk.targetid = 5;
  //   }
  //   link_list.push(lk);
  // }

  // var data = {
  //   lgraph_nodes: nodes_list,
  //   lgraph_links: link_list,
  //   rgraph_nodes: nodes_list,
  //   rgraph_links: link_list,
  // };
  // data.error = 0;
  // data.detail="1 : 1";
  // data.acc = "100%";
  // data.time = "0.1s";
  // res.json(["hello","word"]);
  
});

module.exports = router;
