import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, authState, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { from } from 'rxjs';

import { AuthData } from '@core/models';
import * as fromRoot from '@core/store';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private store: Store, private router: Router, private afAuth: Auth) {}

  initAuthListener() {
    authState(this.afAuth).subscribe(async (user) => {
      console.log("user", user)
      if (user) {

        const storage = getStorage();
        const imageUrl = await getDownloadURL(ref(storage, `profiles/${user.uid}.jpg`)).then((url) => url);
        const isAdmin: boolean = await user.getIdTokenResult(true).then((res) => {
          return !!res.claims['role'] && res.claims['role'] === 'admin';
        });
        this.store.dispatch(
          fromRoot.AuthenticationActions.setAuthenticated({
            isAdmin: isAdmin,
            displayName: user.displayName,
            photoURL: imageUrl,
          })
        );
        this.router.navigate(['/cuttingSheets']);
      } else {
        this.store.dispatch(fromRoot.AuthenticationActions.setUnauthenticated());
        this.router.navigate(['/login']);
      }
    });
  }

  login(authData: AuthData) {
    return from(signInWithEmailAndPassword(this.afAuth, authData.email, authData.password));
  }

  logout() {
    return signOut(this.afAuth);
  }

  getUser(): User | null {
    return this.afAuth.currentUser;
  }
}
