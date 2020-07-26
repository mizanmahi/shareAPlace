export class Modal {
    constructor(contentId){
         this.contentElements = document.getElementById(contentId);
         this.modalElements = document.getElementById('modal-template');
    }

    show(){
        if('content' in document.createElement('template')){
            const modalElements = document.importNode(this.modalElements.content, true);
             this.modal = modalElements.querySelector('.modal');
             this.backdrop = modalElements.querySelector('.backdrop');

            const modalContentEl = document.importNode(this.contentElements.content, true);
            this.modal.appendChild(modalContentEl);

            document.body.insertAdjacentElement('afterbegin', this.modal);
            document.body.insertAdjacentElement('afterbegin', this.backdrop);
        }else{
            alert('Your browser seems dont support some feature')
        }
        
    }

    hide(){
        if(this.modal){
            this.modal.remove();
            this.backdrop.remove();
            this.backdrop = null;
            this.modal = null
        }
    }
}