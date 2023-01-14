import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { from, map, Observable } from 'rxjs';
import { Startup } from '../interfaces/startups.interface';

@Injectable({
  providedIn: 'root',
})
export class StartupsService {
  dbPath = '/startups';
  dbRef: AngularFireList<Startup>;

  dbPathRequset = '/requestedStartup';
  dbRefRequset: AngularFireList<Startup>;
  //
  startupId: string = '';

  constructor(private angularFireDatabase: AngularFireDatabase) {
    this.dbRef = angularFireDatabase.list(this.dbPath);
    this.dbRefRequset = angularFireDatabase.list(this.dbPathRequset);
  }
  create(data: Startup) {
    return this.dbRef.push(data);
  }
  createRequest(data: Startup) {
    return this.dbRefRequset.push(data);
  }
  update(key: string, data: Startup) {
    return this.dbRef.update(key, data);
  }
  updateRequest(key: string, data: Startup) {
    return this.dbRefRequset.update(key, data);
  }
  delete(key: string | undefined) {
    return this.dbRef.remove(key);
  }
  deleteAll() {
    return this.dbRef.remove();
  }

  getById(key: string): Observable<any> {
    return this.angularFireDatabase
      .object(`${this.dbPath}/${key}`)
      .valueChanges();
  }
  getByIdRequest(key: string) {
    return this.angularFireDatabase
      .object(`${this.dbPathRequset}/${key}`)
      .valueChanges();
  }
  getAll(): Observable<any> {
    return this.dbRef
      .snapshotChanges()
      .pipe(
        map((data) =>
          data.map((obj) => ({ ...obj.payload.val(),key: obj.payload.key  }))
        )
      );
  }

  getAllRequested(): Observable<any> {
    return this.dbRefRequset
      .snapshotChanges()
      .pipe(
        map((data) =>
          data.map((obj) => ({ key: obj.payload.key, ...obj.payload.val() }))
        )
      );
  }

  deleteRequset(key: string | undefined) {
    return this.dbRefRequset.remove(key);
  }
  deleteAllRequset() {
    return this.dbRefRequset.remove();
  }

  approve(data: Startup) {
    this.create(data);
    this.deleteRequset(data.key);
  }

  //create startup
  createStartup(key: string, data: Startup): Observable<any> {
    this.startupId = key;
    return from(
      this.dbRefRequset.update(key, {
        key: key,
        emailAddress: data.emailAddress,
        name: data.name,
        logo: data.logo,
        city: data.city,
        sectors: data.sectors,
        numberOfEmployees: data.numberOfEmployees,
        yearsOfEstablish: data.yearsOfEstablish,
        websiteUrl: data.websiteUrl,
      })
    );
  }
}
