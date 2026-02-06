/* Card Functions
==================================
   Name                Author    Date        Notes
   ------------------  --------  ----------  --------------------------------------------------
   muInfoModalToggle   JMM       2025-04-16  Used in conjunction with HTML and CSS to create a Modal overlay on a card to display additional information about the card
   muModalLinks        JMM       2025-04-21  Used to turn link buttons on a card into modal controlling toggles
*/
export function muInfoModalToggle(button = '.umb--info-corner', target = '.umb--info-modal', label = '.umb--info-label', hideIcon = 'close', showIcon = 'question_mark') {
  let infoStatus = 0; //Pseudo-Boolean to toggle modal
  const infoElement = document.querySelector(button);
  const infoContainer = document.querySelector(target);
  const infoLabel = document.querySelector(label);

  const elementPosition = infoElement.addEventListener('click', function () {
    infoStatus = Math.abs(infoStatus - 1); // Status Toggle for 0 -> 1 -> 0

    if (infoStatus == 1) {
      // Show the Modal
      infoContainer.style.visibility = 'visible';
      infoContainer.style.opacity = '1.0';
      infoContainer.style.backgroundColor = 'rgba( 0,0,0,0.5)';
      infoLabel.textContent = hideIcon;
    } else {
      //Hide the Modal
      infoContainer.style.visibility = 'hidden';
      infoContainer.style.opacity = '0';
      infoContainer.style.backgroundColor = 'rgba( 0,0,0,0)';
      infoLabel.textContent = showIcon;
    }
  });
}

export function muModalLinks() {
  const shade = document.querySelector('#modal-shade');
  const indicator = document.querySelector('.umb--indicator');
  const modals = document.querySelectorAll('.umb--modals');
  modals.forEach(modalPrep);
  shade.addEventListener('click', closeModals); //Allows clicking on the shade to close all the open modals

  function closeModals() {
    const openModals = document.querySelectorAll('[data-open]');
    openModals.forEach(function (modal) {
      modal.toggleAttribute('data-open');
      modal.toggleAttribute('data-closed');
      const content = document.querySelector('#${modal.id}-modal');
      shade.classList.add('umb--modal-shade-closed');
      shade.classList.add('umb--modal-closed');
      shade.classList.remove('umb--modal-shade-open');
      shade.classList.remove('umb--modal-open');
      content.classList.add('umb--modal-closed');
      content.classList.remove('umb--modal-open');
      indicator.classList.add('umb--modal-closed');
      indicator.classList.remove('umb--modal-open');
    });
  }

  function openModal(id) {
    const modal = document.querySelector('#${id}');
    modal.toggleAttribute('data-closed');
    modal.toggleAttribute('data-open');
    const content = document.querySelector('#${modal.id}-modal');
    shade.classList.remove('umb--modal-shade-closed');
    shade.classList.remove('umb--modal-closed');
    shade.classList.add('umb--modal-shade-open');
    shade.classList.add('umb--modal-open');
    content.classList.remove('umb--modal-closed');
    content.classList.add('umb--modal-open');
    indicator.classList.remove('umb--modal-closed');
    indicator.classList.add('umb--modal-open');
    setIndicator(id);
    // Prevent the modal overlay content from closing the modal if it is clicked on.
    content.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  }

  function setIndicator(id) {
    const modal = document.querySelector('#${id}');
    const modalLocation = modal.getBoundingClientRect();
    // Top indicator
    const posTop = modalLocation.bottom;
    const posLeft = modalLocation.left + (modalLocation.right - modalLocation.left) / 2 - parseFloat(getComputedStyle(indicator).borderLeftWidth);
    indicator.style.top = posTop + 'px';
    indicator.style.left = posLeft + 'px';
  }

  function modalPrep(modal) {
    const iconSpan = document.createElement('span');
    iconSpan.className = 'material-symbols-outlined';
    iconSpan.textContent = modal.id;
    iconSpan.title = modal.title;

    modal.appendChild(iconSpan);
    modal.toggleAttribute('data-closed');
    closeModals();
    modal.addEventListener('click', function () {
      if (modal.hasAttribute('data-closed')) {
        closeModals();
        openModal(modal.id);
      } else {
        closeModals();
      }
    });
  }
}
