import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PostService } from "src/app/shared/post.service";

@Component({
  selector: "app-edit-post",
  templateUrl: "./edit-post.page.html",
  styleUrls: ["./edit-post.page.scss"],
})
export class EditPostPage implements OnInit {
  updatePostForm: FormGroup;
  id: any;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.id = this.route.snapshot.paramMap.get("id");
    this.postService
      .getPost(this.id)
      .valueChanges()
      .subscribe((res) => {
        this.updatePostForm.setValue(res);
      });
  }

  ngOnInit() {
    this.updatePostForm = this.fb.group({
      author: [""],
      title: [""],
      content: [""],
    });
    console.log(this.updatePostForm.value);
  }

  updateForm() {
    this.postService
      .updatePost(this.id, this.updatePostForm.value)
      .then(() => {
        this.router.navigate([""]);
      })
      .catch((error) => console.log(error));
  }
}
