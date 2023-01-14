import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFireDatabase,AngularFireList,} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isloggedIn$ = new BehaviorSubject<boolean>(!!localStorage.getItem('userId'));
  dbPath = '/users';
  dbRef: AngularFireList<any>;
  userInfo = new BehaviorSubject<any>({});
  userId: string = '';
  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private angularFireDatabase: AngularFireDatabase
  ) {
    this.dbRef = angularFireDatabase.list(this.dbPath);
    this.authStateSubscribe();
  }

  get isLoggedIn(): boolean {
    return this.isloggedIn$.getValue();
  }
  //login
  login(email: string, password: string): Observable<any> {
    return from(
      this.angularFireAuth
        .signInWithEmailAndPassword(email, password)
        .catch((error) => {
          window.alert(error.massage);
          this.router.navigate(['/auth/login']);
        })
    );
  }

  authStateSubscribe() {
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        if (!this.isLoggedIn) {
          this.router.navigate(['/startup/all-startup']);
        }
        this.getUserById(user.uid);
        localStorage.setItem('userId', user.uid);
        this.isloggedIn$.next(true);
      } else {
        localStorage.removeItem('userId');
        //this.router.navigate(['/auth/login']);
        this.isloggedIn$.next(false);
      }
    });
  }

  //signup
  signup(email: string, password: string): Observable<any> {
    return from(
      this.angularFireAuth
        .createUserWithEmailAndPassword(email, password)
        .catch((error) => {
          window.alert(error.massage);
        })
    );
  }

  //create user
  createUser(userId: string, email: string, name: string): Observable<any> {
    this.userId = userId;
    return from(
      this.dbRef.update(userId, {
        userId: userId,
        email: email,
        name: name,
        role: 'enduser',
      })
    );
  }

  //logout
  logout() {
    this.angularFireAuth.signOut().then(() => {
      localStorage.removeItem('userId');
      this.router.navigate(['/home']);
      this.isloggedIn$.next(false);
    });
  }

  getUserById(userId: string) {
    this.angularFireDatabase
      .object(`${this.dbPath}/${userId}`)
      .valueChanges()
      .subscribe((user) => {
        this.userInfo.next(user);
      });
  }
}
