(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{xSnB:function(t,o,e){"use strict";e.r(o),e.d(o,"Tab1PageModule",(function(){return h}));var n=e("TEn/"),i=e("ofXK"),s=e("3Pt+"),c=e("tyNb"),b=e("fXoL"),r=e("EthR");const l=function(t){return["edit-post/",t]};function a(t,o){if(1&t){const t=b.Mb();b.Lb(0,"ion-item",3),b.Lb(1,"ion-label"),b.Lb(2,"p"),b.Jb(3,"ion-icon",4),b.gc(4),b.Kb(),b.Lb(5,"p"),b.Jb(6,"ion-icon",5),b.gc(7),b.Kb(),b.Kb(),b.Lb(8,"div",6),b.Lb(9,"button",7),b.Jb(10,"ion-icon",8),b.Kb(),b.Lb(11,"button",9),b.Tb("click",(function(){b.cc(t);const e=o.$implicit;return b.Vb().deletePost(e.$key)})),b.Jb(12,"ion-icon",10),b.Kb(),b.Kb(),b.Kb()}if(2&t){const t=o.$implicit;b.yb(4),b.hc(" ",t.author," "),b.yb(3),b.hc(" ",t.title," "),b.yb(2),b.Yb("routerLink",b.ac(3,l,t.$key))}}const u=[{path:"",component:(()=>{class t{constructor(t){this.postService=t,this.posts=[]}ngOnInit(){this.fetchPosts(),this.postService.getPostList().snapshotChanges().subscribe(t=>{this.posts=[],t.forEach(t=>{let o=t.payload.toJSON();o.$key=t.key,this.posts.push(o)})})}fetchPosts(){this.postService.getPostList().valueChanges().subscribe(t=>{console.log(t)})}deletePost(t){console.log(t),window.confirm("Do you really want to delete?")&&this.postService.deletePost(t)}}return t.\u0275fac=function(o){return new(o||t)(b.Ib(r.a))},t.\u0275cmp=b.Cb({type:t,selectors:[["app-tab1"]],decls:9,vars:1,consts:[[1,"ios","list-ios","hydrated"],[1,"ios","hydrated"],["class","user-list",4,"ngFor","ngForOf"],[1,"user-list"],["name","person"],["name","call"],["item-end","",1,"item-note"],["ion-button","","clear","",3,"routerLink"],["name","create",2,"zoom","2.0"],["ion-button","","clear","",3,"click"],["name","trash",2,"zoom","2.0"]],template:function(t,o){1&t&&(b.Lb(0,"ion-header"),b.Lb(1,"ion-toolbar"),b.Lb(2,"ion-title"),b.gc(3," Vanilla "),b.Kb(),b.Kb(),b.Kb(),b.Lb(4,"ion-content"),b.Lb(5,"ion-list",0),b.Lb(6,"ion-list-header",1),b.gc(7," Posts "),b.Kb(),b.fc(8,a,13,5,"ion-item",2),b.Kb(),b.Kb()),2&t&&(b.yb(8),b.Yb("ngForOf",o.posts))},directives:[n.i,n.v,n.u,n.g,n.n,n.o,i.h,n.l,n.m,n.j,n.z,c.h],styles:[""]}),t})()},{path:"edit-post/:id",loadChildren:()=>e.e(11).then(e.bind(null,"EHVf")).then(t=>t.EditPostPageModule)}];let p=(()=>{class t{}return t.\u0275mod=b.Gb({type:t}),t.\u0275inj=b.Fb({factory:function(o){return new(o||t)},imports:[[c.i.forChild(u)],c.i]}),t})(),h=(()=>{class t{}return t.\u0275mod=b.Gb({type:t}),t.\u0275inj=b.Fb({factory:function(o){return new(o||t)},imports:[[n.w,i.b,s.d,p]]}),t})()}}]);