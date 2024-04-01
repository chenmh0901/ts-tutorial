const url: string = 'https://api.thecatapi.com/v1/images/search';
const button: HTMLButtonElement | null = document.querySelector('button');
const tableBody: HTMLTableElement | null = document.querySelector('#tablebody');
interface CatType {
  id: string;
  url: string;
  width: number;
  height: number;
  test?: string;
}
class Cat implements CatType {
  id: string;
  url: string;
  width: number;
  height: number;

  constructor(id: string, url: string, width: number, height: number) {
    this.id = id;
    this.url = url;
    this.width = width;
    this.height = height;
  }
}
class WebDispaly {
  public static addDate(date: CatType) {
    const cat: Cat = new Cat(date.id, date.url, date.width, date.height);
    const tableRow: HTMLTableRowElement = document.createElement('tr');
    tableRow.innerHTML = `
      <td>${cat.id}</td>
      <td><img src="${cat.url}" /></td>
      <td>${cat.width.toString()}</td>
      <td>${cat.height.toString()}</td>
      <td><a href=#>X</a></td>
    `
    tableBody?.appendChild(tableRow);
    console.log(date);
    console.log(tableBody);
    console.log(document.querySelector('#table-body'));

  }
  public static deleteDate(deleteButton: HTMLAnchorElement): void {
    const td = deleteButton.parentElement;
    const tr = td?.parentElement
    tr?.remove();
  }
}
async function getJson<T>(url: string): Promise<T> {
  return fetch(url).then((response) => response.json());
}
async function getCat(): Promise<void> {
  try {
    const json: CatType[] = await getJson<CatType[]>(url);
    const data: CatType = json[0];
    WebDispaly.addDate(data);
  } catch (e) {
    console.log(e);
  }
}
button?.addEventListener<'click'>('click', getCat);
tableBody?.addEventListener<'click'>('click', (e: MouseEvent) => {
  WebDispaly.deleteDate(<HTMLAnchorElement>e.target);
})
