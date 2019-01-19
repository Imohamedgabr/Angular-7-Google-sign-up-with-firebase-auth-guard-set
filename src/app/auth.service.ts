import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // we have to always unsubscribe from firebase
  // we always add dollar sign to the observables
  user$: Observable<firebase.User>;
  logged_user : any;

  constructor(private afAuth: AngularFireAuth , private router: Router) {
    this.user$ = afAuth.authState;

    this.user$.subscribe(user => {
      if(user){
        this.logged_user = user;
      }
      // checking if we have a logged user by subscribing to the observable
      return false;
    });

   }

  login(){
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  isAuthenticated(){
    if(this.logged_user){
      return true;
    }else{
      return false;
    }
    
  }
}
