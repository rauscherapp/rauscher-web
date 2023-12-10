import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AspNetUserService } from '../aspnetusers.service';
import { AspNetUser } from 'app/core/aspnetuser/aspnetusers.types';
import { Observable, Subject, of } from 'rxjs';
import { TextFieldModule } from '@angular/cdk/text-field';
import { NgIf, NgFor, NgClass, AsyncPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { QuillEditorComponent } from 'ngx-quill';


@Component({
    selector: 'app-user-details',
    templateUrl: './userdetails.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgIf,
        MatButtonModule,
        MatIconModule,
        FormsModule,
        TextFieldModule,
        NgFor,
        MatCheckboxModule,
        NgClass,
        MatRippleModule,
        MatMenuModule,
        MatDialogModule,
        AsyncPipe,
        ReactiveFormsModule,
        MatFormFieldModule, 
        MatInputModule, 
        QuillEditorComponent
    ],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
    user: AspNetUser;
    user$: Observable<AspNetUser>;
    composeForm: UntypedFormGroup;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) private _data: { user: AspNetUser },
        private _userService: AspNetUserService,
        private _matDialogRef: MatDialogRef<UserDetailsComponent>,
        private _formBuilder: UntypedFormBuilder
    ) {}

    ngOnInit(): void {
        // Create the form
        this.composeForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            firstName: ['', [Validators.required]],
            lastName: [''],
            password: ['', [Validators.required]],
            confirmPassword: ['', [Validators.required]],
        });
        // Edit
        if (this._data.user.id) {
            // Request the data from the server
            this._userService.getAspNetUserById(this._data.user.id).subscribe();
            // Get the user
            this.user$ = this._userService.aspNetUser$;
        } else {
            // Create an empty note
            const user = {
                id: '',
                userName: '',
                normalizedUserName: '',
                email: '',
                normalizedEmail: '',
                emailConfirmed: false,
                passwordHash: null,
                password: '',
                confirmPassword: '',
                securityStamp: null,
                concurrencyStamp: '',
                phoneNumber: '',
                phoneNumberConfirmed: false,
                twoFactorEnabled: false,
                lockoutEnd: null,
                lockoutEnabled: false,
                accessFailedCount: 0,
            };

            this.user$ = of(user);
        }
    }
    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    createUser(): void {
        this.user = {
            id: null,
            userName: '',
            normalizedUserName: '',
            email: this.composeForm.get('email')?.value,
            normalizedEmail: this.composeForm.get('email')?.value,
            emailConfirmed: false,
            passwordHash: null,
            password: this.composeForm.get('password')?.value,
            confirmPassword: this.composeForm.get('confirmPassword')?.value,
            securityStamp: null,
            concurrencyStamp: '',
            phoneNumber: '',
            phoneNumberConfirmed: false,
            twoFactorEnabled: false,
            lockoutEnd: null,
            lockoutEnabled: false,
            accessFailedCount: 0,
          };
        // Assuming you have a createUser method in your UserService
        this._userService.createAspNetUser(this.user).subscribe(
            () => {
                // Handle success, e.g., show a success message, navigate to a different page, etc.
                console.log('User created successfully');
            },
            (error) => {
                // Handle error, e.g., display an error message
                console.error('Error creating user:', error);
            }
        );
    }
}