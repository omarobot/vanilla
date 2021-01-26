import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.scss"],
})
export class EventsComponent implements OnInit {
  posts = [];
  imageUrlArray = [];

  public lists: Observable<any[]>;
  constructor() {}

  ngOnInit() {
    this.imageUrlArray = [
      {
        image:
          "https://c9n8c2u8.rocketcdn.me/wp-content/uploads/2018/01/Birthday-Party-flyer-510x750.jpg",
      },
      {
        image:
          "https://www.liveabout.com/thmb/JS0NvnJu3SEg1OTAzwfR7g0fSHo=/4268x3201/smart/filters:no_upscale()/hispanic-salsa-dancers-performing-580491737-5b72290ac9e77c0050753fb0.jpg",
      },
      {
        image:
          "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/glow-disco-party-poster-template-2d310ac36d313dfc6fbc11b714f3859f_screen.jpg?ts=1561530801",
      },
      {
        image:
          "https://i.pinimg.com/474x/c1/ba/af/c1baaffd9308b592a5e6afdf00737ede.jpg",
      },
      {
        image:
          "https://staticecp.uprinting.com/74/450x450/Club_Card_Flyers_Eventst_Advertising_Materials_A.jpg",
      },
      {
        image:
          "https://graphicriver.img.customer.envatousercontent.com/files/276109343/Final%20Presentation%20single.jpg?auto=compress%2Cformat&q=80&fit=crop&crop=top&max-h=8000&max-w=590&s=78c33795b91a5b6813fc94d534f34eb3",
      },
      {
        image:
          "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/summer-party-video-ad-template-design-024d0ddcdf0746f9fa1e87773c385103_screen.jpg?ts=1567082239",
      },
      {
        image:
          "https://d12swbtw719y4s.cloudfront.net/images/fQjcOVwV/T7IE1H6aPSq9ZHEqHcEb/xDRM4hFy3U.jpeg?w=1200",
      },
      {
        image:
          "https://img.delicious.com.au/CKMUcpx-/w1200/del/2015/11/summer-cocktails-24374-3.jpg",
      },
      {
        image:
          "https://i.pinimg.com/originals/7b/49/71/7b4971c25a3d601c06fb4ffd34cdae18.jpg",
      },
      {
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_g8-hTBZw-obIWJyWVIahYOUtn9svTAwjIQ&usqp=CAU",
      },
      {
        image:
          "https://www.templateupdates.com/wp-content/uploads/2019/02/All-White-Party-Flyer-Template.jpg",
      },
    ];
    this.posts = [
      {
        description: "Trying out digital painting",
        image:
          "https://s-media-cache-ak0.pinimg.com/564x/d5/63/b0/d563b08194f0a92cc7d381f7f8582a08.jpg",
      },
      {
        description: "",
        image:
          "https://s-media-cache-ak0.pinimg.com/236x/43/f3/3d/43f33de6f96ca8e6f8dc6ff1ad86b586.jpg",
      },
      {
        description: "Look at this amazing clay humming bird I crafted!",
        image:
          "https://s-media-cache-ak0.pinimg.com/236x/68/68/a2/6868a2f821e5d15cc8fcd8cfa1694606.jpg",
      },
      {
        description: "Origami tullip tutorial",
        image:
          "https://s-media-cache-ak0.pinimg.com/236x/38/6f/8e/386f8ec1725f09883d827094228d0f82.jpg",
      },
      {
        description: "",
        image:
          "https://s-media-cache-ak0.pinimg.com/564x/f6/61/5c/f6615ca7068da18157588890f9e9e03a.jpg",
      },
      {
        description: "",
        image:
          "https://s-media-cache-ak0.pinimg.com/564x/0d/29/35/0d2935d14c17aff1baab75360c9e2bd6.jpg",
      },
      {
        description: "Delicious chocolate bread recipe!",
        image:
          "https://s-media-cache-ak0.pinimg.com/564x/06/a9/8e/06a98e67111aae83a481a2c1dbb594a4.jpg",
      },
      {
        description: "",
        image:
          "https://s-media-cache-ak0.pinimg.com/564x/d5/8c/37/d58c3783d6ebf79db0f9c057726800a0.jpg",
      },
      {
        description: "",
        image:
          "https://s-media-cache-ak0.pinimg.com/564x/f5/35/97/f53597bf16aff91315a0beca27ffdbda.jpg",
      },
      {
        description: "",
        image:
          "https://s-media-cache-ak0.pinimg.com/564x/cf/fe/6d/cffe6dd7dece1cb0562f65cd3bfba1ac.jpg",
      },
      {
        description: "Fastest car of all times",
        image:
          "https://s-media-cache-ak0.pinimg.com/564x/5f/bf/34/5fbf3414f9de301c8f4b868b1c2e2339.jpg",
      },
    ];

    console.log("start");
    // this.lists = this.firestore
    //   .collection<any>("layout_masonry")
    //   .valueChanges();
  }
  getFeed() {
    console.log("start getCategory");
  }
  toggleSideMenu() {
    console.log("call toggleSideMenu");
    // this.menuCtrl.toggle(); //Add this method to your button click function
  }
}
