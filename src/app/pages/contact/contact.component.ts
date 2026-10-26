import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SITE, img } from '../../site';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  img = img;
  site = SITE;
  heroImg = 'contact-hero.jpg'; // change extension here if yours differs
  sent = false;

  subjects = ['Product Enquiry', 'Bulk / Wholesale Order', 'Dealership', 'Feedback', 'Other'];
  hours = { days: 'Monday - Saturday', time: '9:00 AM – 6:00 PM', closed: 'Sunday - Closed' };

  help = [
    { icon: 'verified_user', title: 'Trusted Manufacturer', text: 'High-quality fibre made bedding products.' },
    { icon: 'eco', title: 'Safe & Hygienic', text: 'Washable, non-allergic and fresh.' },
    { icon: 'favorite', title: 'Customer Focused', text: 'Your comfort is our priority.' },
    { icon: 'groups', title: 'Serving Communities', text: 'Better sleep for a healthier life.' }
  ];

  mapUrl: SafeResourceUrl;

  constructor(sanitizer: DomSanitizer) {
    const q = encodeURIComponent('SriSathy Priyaa Mill, ' + SITE.address);
    this.mapUrl = sanitizer.bypassSecurityTrustResourceUrl(`https://maps.google.com/maps?q=${q}&z=15&output=embed`);
  }

  whatsapp() {
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Hi, I need assistance regarding your products.')}`, '_blank');
  }

  /** Sends the enquiry to WhatsApp. Replace with an HTTP call if you add a backend/email API. */
  send(event: Event, form: HTMLFormElement) {
    event.preventDefault();
    const d = new FormData(form);
    const text =
      `New enquiry from website\n` +
      `Name: ${d.get('name')}\nEmail: ${d.get('email')}\nPhone: ${d.get('phone')}\n` +
      `Subject: ${d.get('subject') || '-'}\nMessage: ${d.get('message')}`;
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
    this.sent = true;
    form.reset();
  }
}
