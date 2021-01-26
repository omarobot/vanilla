import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ModalService } from "src/app/shared/services/modal.service";

@Component({
  selector: "app-post-modal",
  templateUrl: "./post-modal.component.html",
  styleUrls: ["./post-modal.component.scss"],
})
export class PostModalComponent implements OnInit {
  display$: Observable<boolean>;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    // this.display$ = this.modalService.watch();
  }

  close() {
    this.modalService.close();
  }
}
