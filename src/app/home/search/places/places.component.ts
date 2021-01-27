import { Component, OnInit } from "@angular/core";
import { HideHeaderConfig } from "src/app/shared/hide-header/hide-header.directive";
import { PostService } from "src/app/shared/services/post.service";

@Component({
  selector: "app-places",
  templateUrl: "./places.component.html",
  styleUrls: ["./places.component.scss"],
})
export class PlacesComponent implements OnInit {
  footerScrollConfig: HideHeaderConfig = {
    cssProperty: "margin-bottom",
    maxValue: undefined,
  };
  headerScrollConfig: HideHeaderConfig = {
    cssProperty: "margin-top",
    maxValue: 40,
  };

  slideOption = {
    slidesPerView: "auto",
    grabCursor: true,
  };

  // public currentRoute: any;
  // public parentPath: any;
  //public categories: any[];
  public popularArray: any[];
  public topRatingPlaces: any[];
  public favorites: any[];
  public tags: any[];

  //********* Observable *********/

  populars: Array<any> = [];
  categories: Array<any> = [];
  promotions: Array<any> = [];

  constructor(public postService: PostService) {}
  ngOnInit() {
    this.getPopular();
    this.getCategory();
    this.getPromotion();
  }

  getPopular() {
    // this.foodService.getPopularItem().subscribe(actionArray => {
    //   console.log("----->actionArray="+actionArray);
    //   this.popularArray = actionArray
    // });
    //   or Observable with async ////
    // this.populars = this.foodService.getPopularItems();
    this.postService.getPopular().subscribe(
      (data: any) => {
        // console.log(data);
        let keys = Object.keys(data);
        let array = [];
        keys.forEach((key) => {
          array.push(data[key]);
        });

        this.populars = [...array];
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  getCategory() {
    // this.categories = this.foodService.getCategories();
    this.postService.getCategories().subscribe(
      (data: any) => {
        // console.log(data);
        let keys = Object.keys(data);
        let array = [];
        keys.forEach((key) => {
          array.push(data[key]);
        });

        this.categories = [...array];
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getPromotion() {
    this.postService.getPopular().subscribe(
      (data: any) => {
        // console.log(data);
        let keys = Object.keys(data);
        let array = [];
        keys.forEach((key) => {
          if (data[key].promotion == true) array.push(data[key]);
        });

        this.promotions = [...array];
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
