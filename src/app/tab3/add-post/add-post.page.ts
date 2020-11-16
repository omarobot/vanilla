import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { PostService } from "src/app/shared/post.service";

@Component({
  selector: "app-add-post",
  templateUrl: "./add-post.page.html",
  styleUrls: ["./add-post.page.scss"],
})
export class AddPostPage implements OnInit {
  postForm: FormGroup;

  constructor(
    private postService: PostService,
    private router: Router,
    public fb: FormBuilder
  ) {}

  ngOnInit() {
    this.postForm = this.fb.group({
      author: [""],
      title: [""],
      content: [""],
    });
  }

  formSubmit() {
    if (!this.postForm.valid) {
      return false;
    } else {
      this.postService
        .createPost(this.postForm.value)
        .then((res) => {
          console.log(res);
          this.postForm.reset();
          this.router.navigate(["/"]);
        })
        .catch((error) => console.log(error));
    }
  }
}
