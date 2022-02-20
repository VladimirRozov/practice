import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Document, Message} from "../interfaces";

@Injectable({providedIn: 'root'})

export class DocumentServices {
  constructor(private http: HttpClient) {
  }

  getByChapter(chapterId: String): Observable<Document[]> {
    return this.http.get<Document[]>(`/api/document/${chapterId}`)
  }
  getById(id: String): Observable<Document> {
    return this.http.get<Document>(`/api/document/${id}`)
  }
  create(doc: Document): Observable<Document>{
    // @ts-ignore
    return this.http.post('/api/document/', doc)
  }

  remove (id: string): Observable<Message>{
    return this.http.delete<Message>(`/api/document/${id}`)
  }
}
