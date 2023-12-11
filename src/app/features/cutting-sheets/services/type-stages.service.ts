import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData } from '@firebase/firestore';

import { DocumentReference, Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { TypeStage, TypeStageServer } from '../models/type-stage';
import { Type } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TypeStagesService {
  private typesCollection: CollectionReference<DocumentData>;
  private stageDoc: DocumentReference<DocumentData, DocumentData>;

  constructor(private readonly firestore: Firestore) {
    this.typesCollection = collection(this.firestore, 'typeStages');
  }

  public getAll(): Observable<TypeStage[]> {
    const allTypeStages = collectionData(this.typesCollection, {
      idField: 'id',
    }) as Observable<TypeStage[]>;

    return allTypeStages.pipe(
      map((data): TypeStageServer[] => this.getAllTypeStagesAdapter(data))
    )

  }

  public get(id: string): Observable<TypeStage> {
    const typesReference = doc(this.firestore, `typeStages/${id}`);
    return docData(typesReference, { idField: 'id' }) as Observable<TypeStage>;
  }

  private getAllTypeStagesAdapter(typeStages: TypeStageServer[]): TypeStage[] {
    return typeStages.map((stage): TypeStageServer => {
      const stageTypeRef = stage.jobType.path;
      return <TypeStage>{ ...stage, jobType: stageTypeRef }
    })
  }

}
