import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SITE, img } from '../../site';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  img = img;
  email = SITE.email;

  // image file names – change extension here if yours differ
  heroImg = 'about-hero.png';
  factoryImg = 'factory.png';
  qualityImg = 'quality.jpg';

  intro = 'SriSathy Priyaa Mill is a leading manufacturer of fibre made bedding products, committed to providing comfort, hygiene and quality for a healthier life. Our products are designed to support good sleep and overall well-being.';

  who = [
    'SriSathy Priyaa Mill is a renowned manufacturer of high-quality fibre made bedding products. With a strong commitment to excellence, we have been serving our customers with products that combine comfort, durability and hygiene. Our wide range of products is designed to meet the diverse needs of families, institutions and healthcare facilities.',
    'We use advanced manufacturing processes and premium raw materials to ensure that every product delivers the best sleep experience.'
  ];

  mission = 'Our Mission is to revolutionize the way people sleep by providing them with washable, non allergic & Hygienic bedding products that provide more comfortable quality sleeping environment, we are dedicated to delivering outstanding customer service and continuously improving our products to meet the changing needs of our customers, we aim to promote healthy habits where everyone wakes up feeling refreshed and rejuvenated.';

  vision = "Our vision is to become the leading provider of premium quality pillows and mattresses that offer the ultimate comfort and support for a restful quality sleep that enhance sleep experiences and promote healthy sleep and improve people's quality of life.";

  values = [
    { icon: 'workspace_premium', title: 'Quality', text: 'We are committed to creating high-quality products that provide the best comfort and support for our customers.' },
    { icon: 'lightbulb', title: 'Innovation', text: 'We strive to continuously improve our products and processes through innovative technology and design.' },
    { icon: 'sentiment_satisfied', title: 'Customer Satisfaction', text: 'We prioritize our customers needs and satisfaction above all else and seek to exceed their expectations.' },
    { icon: 'handshake', title: 'Integrity', text: 'We conduct our business with honesty, transparency and ethical standards in all our dealings with our customers, employees and partners.' },
    { icon: 'groups', title: 'Teamwork', text: 'We believe in the power of collaboration and work together as a team to achieve our goals.' },
    { icon: 'favorite', title: 'Respect', text: 'We treat everyone with respect and dignity, embracing diversity and fostering a culture of inclusivity.' },
    { icon: 'diversity_3', title: 'Community', text: 'We strive to be an active and responsible member of the communities in which we operate, supporting local initiatives and charities.' }
  ];

  policy = 'We are committed to delivering high-quality, safe and hygienic bedding products that meet global standards. Our focus is on continuous improvement, customer satisfaction and responsible manufacturing practices.';
  policyPoints = ['Washable & Hygienic', 'No Heat Retention', 'Non Allergenic', 'Premium Fibre Fill', 'Durable & Long Lasting'];

  why = [
    { icon: 'verified_user', text: 'High-quality fibre fill products' },
    { icon: 'local_laundry_service', text: 'Washable and long-lasting' },
    { icon: 'cloud', text: 'Comfortable and breathable' },
    { icon: 'diamond', text: 'Trusted by families & institutions' },
    { icon: 'eco', text: 'Ideal for all age groups' }
  ];
}
