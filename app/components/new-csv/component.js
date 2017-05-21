import Ember from 'ember';
import saveAs from 'FileSaver.js';

export default Ember.Component.extend({
  
  headerColumns: [],
  
  rows: 2,
  
  init() {
    this._super(...arguments);
    this.set('headerColumns', ['Name', 'Email']);
  },
  
  rowArray: Ember.computed('rows', function() {
    let array = [];
    for (let i = 0; i < this.get('rows'); i++) {
      array.push(i);
    }
    return array; 
  }),
  
  actions: {
    save() {
      var csv = [];
      let lineNumber = 0;
      for (let element of $('table th')) {
        let content = element.textContent.trim();
        if (csv[lineNumber]) {
          csv[lineNumber] += `,${content}`;
        } else {
          csv[lineNumber] = content;
        }
      }
      
      lineNumber++;

      let columnLength = $('table th').length;
      
      let count = 0;
      for (let column of $('table tbody td')) {
        let columnValue = column.textContent.trim();

        if (csv[lineNumber]) {
          csv[lineNumber] += `,${columnValue}`;
        } else {
          csv[lineNumber] = `\r\n${columnValue}`;
        }

        count++;
        
        if (count === columnLength) {
          count = 0;
          lineNumber++;
        }
      }

      var blob = new Blob(csv, {type: "text/plain; charset=utf-8"});
      saveAs(blob, "sample.csv");
      console.log(csv);
    },
    
    add(entity) {
      if (entity === 'column') {
        let headerColumns = this.get('headerColumns');
        headerColumns.push('Sample');
        this.set('headerColumns', headerColumns.slice());
      }
      
      if (entity === 'row') {
        this.set('rows', this.get('rows')+1);
      }
    }
  }
});
