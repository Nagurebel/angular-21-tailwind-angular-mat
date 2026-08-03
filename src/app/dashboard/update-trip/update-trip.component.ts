import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trip } from '../../services/trip';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { InputComponent } from "../../shared/input/input.component";

@Component({
  selector: 'app-update-trip',
  imports: [ɵInternalFormsSharedModule, InputComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './update-trip.component.html',
  styleUrl: './update-trip.component.css',
})
export class UpdateTripComponent {
  private activeRoute = inject(ActivatedRoute);
  private tripService = inject(Trip);
  private fb = inject(FormBuilder);
  tripId: number | null | undefined;
  updatedTripForm: FormGroup;

  constructor() {
    this.updatedTripForm = this.fb.group({
      id: [""],
      title: ["", [Validators.required, Validators.maxLength(5)]]
    })
  }


  public get titleContent() {
    return this.updatedTripForm.get("title") as FormControl;
  }


  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
      let id = params.get('id');
      if (id) {
        let parId = Number(id);
        this.tripService.getTripById(parId).subscribe({
          next: (res) => {
            this.updatedTripForm.patchValue(res);
            console.log(res);
          },
          error: (err) => {
            console.error('Error fetching trip data:', err);
          }
        });
      }
    });
  }

  submit() {
    console.log("this.updatedTripForm", this.updatedTripForm.value)
  }


}
