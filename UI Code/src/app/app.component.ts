import { Component, OnInit } from '@angular/core';
import { FetchQueryService } from './services/fetch-query.service';
import { Router } from '@angular/router';

declare let YASGUI: any;
declare let YASR: any;
declare let $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kd-app';
  data = [];
  queryResp = {};
  isQuery = true;
  isCustomQuery = false;
  constructor(private fetchQueryService: FetchQueryService, private router: Router) { }

  ngOnInit() {
    // var yasgui = YASGUI(document.getElementById("yasgui"), {
    //   //Uncomment below to change the default endpoint
    //   //Note: If you've already opened the YASGUI page before, you should first clear your
    //   //local-storage cache before you will see the changes taking effect 
    //   //yasqe:{sparql:{endpoint:'bla'}}
    // });
    this.data = [
      {
        queryForHTML: "PREFIX&nbsp;rdf:&nbsp;&lt;http://www.w3.org/1999/02/22-rdf-syntax-ns#&gt;<br/>PREFIX&nbsp;rdfs:&nbsp;&lt;http://www.w3.org/2000/01/rdf-schema#&gt;<br/>SELECT&nbsp;*&nbsp;WHERE&nbsp;{<br/>?sub&nbsp;?pred&nbsp;?obj&nbsp;.<br/>}<br/>LIMIT&nbsp;10",
        queryStr: "SELECT ?subject ?predicate ?object\r\n    WHERE {\r\n      ?subject ?predicate ?object\r\n    }\r\n    LIMIT 25"
      }
    ]

    // var PREFIX = {
    //   "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    //   "owl": "http://www.w3.org/2002/07/owl#",
    //   "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
    //   "xsd": "http://www.w3.org/2001/XMLSchema#",
    //   "gdprov": "http://purl.org/adaptcentre/openscience/ontologies/gdprov#",
    //   "gdprtext": "http://purl.org/adaptcentre/openscience/ontologies/GDPRtEXT#",
    //   "p-plan": "http://purl.org/net/p-plan#",
    //   "prov": "http://www.w3.org/ns/prov#",
    //   "this": "http://example.com/ontology/shoppingapp#"
    // }

    // $.get("http://openscience.adaptcentre.ie/sparql?default-graph-uri=http%3A%2F%2Fpurl.org%2Fadapt%2Fshopping%23&query=PREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0D%0APREFIX+gdprov%3A+%3Chttp%3A%2F%2Fpurl.org%2Fadaptcentre%2Fopenscience%2Fontologies%2Fgdprov%23%3E%0D%0APREFIX+gdprtext%3A+%3Chttps%3A%2F%2Fpurl.org%2Fadaptcentre%2Fopenscience%2Fontologies%2FGDPRtEXT%23%3E%0D%0APREFIX+p-plan%3A+%3Chttp%3A%2F%2Fpurl.org%2Fnet%2Fp-plan%23%3E%0D%0APREFIX+prov%3A+%3Chttp%3A%2F%2Fwww.w3.org%2Fns%2Fprov%23%3E%0D%0APREFIX+this%3A+%3Chttp%3A%2F%2Fexample.com%2Fontology%2Fshoppingapp%23%3E%0D%0A%0D%0ASELECT+DISTINCT+%3Fdata+%3Ftype+where+%7B%0D%0A++%3Fdata+a+%3Ftype+.%0D%0A++%3Ftype+rdfs%3AsubClassOf+gdprov%3APersonalData+.%0D%0A++FILTER%28regex%28str%28%3Fdata%29%2C+%22http%3A%2F%2Fexample.com%2Fontology%2Fshoppingapp%23%22%29%29+.%0D%0A%7D+ORDER+BY+%3Fdata+%3Ftype%0D%0A&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on", function(data, status) {
    //     YASR(document.getElementById("results-G2"), {
    //         getUsedPrefixes: PREFIX
    //     }, data);
    // });
  }

  executeQuery(event) {
    console.log(event);
    let query = `SELECT ?subject ?predicate ?object
                  WHERE
                  {
                  ?subject ?predicate ?object
                  }
                  LIMIT 25`
    let query1 = "query=" + encodeURIComponent(query);
    this.fetchQueryService.fetchQueryData(query1).subscribe((response) => {
      console.log(response);
      this.queryResp['header'] = response['head']['vars'];
      this.queryResp['data'] = response['results']['bindings'];
      console.log(this.queryResp);
    });
  }

  queryClick() {
    this.isCustomQuery = false;
    this.isQuery = true;
    this.router.navigateByUrl('showQuery');
  }

  customQueryClick() {
    this.isCustomQuery = true;
    this.isQuery = false;
    this.router.navigateByUrl('query');
  }

}
