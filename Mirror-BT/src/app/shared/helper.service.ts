import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HelperService
{

    
constructor(private _snackBar:MatSnackBar){}

    openSnackBar(message: string, action: string) {   
        this._snackBar.open(message, action, {
          duration: 2000,
          horizontalPosition: 'center',
            verticalPosition: 'top',
        });
      }
    

}



