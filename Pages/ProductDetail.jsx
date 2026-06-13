import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { createPageUrl, resolveAssetPath } from '@/utils';
import { apiFetch } from '@/services/apiClient';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Phone, Mail, CheckCircle, ChevronRight, ZoomIn } from 'lucide-react';

import ImageZoom from '@/components/ui/ImageZoom';

const productData = {
  // Uniforms - Automobile Industry & Security
  'automobile': {
    title: 'Automobile Industry & Security Uniforms',
    category: 'uniforms',
    description: 'High-quality workwear designed for automobile and industrial sectors with durability and comfort.',
    mainImage: 'public/uni-1.jpg',
    features: [
      'High durability and tear resistance',
      'Comfortable fit for long working hours',
      'Multiple pocket designs for utility',
      'Available in various colors and sizes',
      'Fire retardant options available',
      'Meets industry safety standards'
    ],
    sections: [
      {
        title: 'Industrial & Security Work Wear',
        items: [
          { name: 'Corporate Uniform', modelNo: 'Model No: 001', image: 'public/corporate-uniforms-big.jpg', description: 'Industrial & Security Work Wear Corporate Uniform' },
          { name: 'Factory Uniform Front', modelNo: 'Model No: 002A', image: 'public/FACTORY-UNIFORM-front.jpg', description: 'Factory Uniform Front View' },
          { name: 'Factory Uniform Back', modelNo: 'Model No: 002B', image: 'public/FACTORY-UNIFORMS.jpg', description: 'Factory Uniform Back View' },
          { name: 'Worker Uniform', modelNo: 'Model No: 003', image: 'public/worker-uniform.jpg', description: 'Worker Uniform for Industrial Use' },
          { name: 'Security Uniform Complete', modelNo: 'Model No: 004', image: 'public/security-uniforms-with specification.jpg', description: 'Security Uniform With All Specifications' },
          { name: 'Security Uniform Black Male', modelNo: 'Model No: 005A', image: 'public/Radiant-men.jpg', description: 'Security Uniform Black - Male' },
          { name: 'Security Uniform Black Female', modelNo: 'Model No: 005B', image: 'public/radiant-lady-uniform.jpg', description: 'Security Uniform Black - Female' }
        ]
      },
      {
        title: 'Boiler Suits / Overalls / Coveralls',
        items: [
          { name: 'Boiler Suits Standard', modelNo: 'Model No: 006', image: 'public/boiler-suits-big.jpg', description: 'Boiler Suits / Overalls / Coveralls' },
          { name: 'Boiler Suits M/F', modelNo: 'Model No: 007', image: 'public/Boiler-Suits-men&women-big.jpg', description: 'Boiler Suits Male & Female' },
          { name: 'Overalls With Reflective', modelNo: 'Model No: 008', image: 'public/boiler-suit-with-reflective-big.jpg', description: 'Overalls With Reflective Strips' },
          { name: 'Overalls Without Reflective', modelNo: 'Model No: 009', image: 'public/boiler-suit-without-reflective.jpg', description: 'Overalls Without Reflective' },
          { name: 'Coveralls Blue', modelNo: 'Model No: 010', image: 'public/coverall-big.jpg', description: 'Coveralls Blue Color' },
          { name: 'Cotton Overalls Reflective', modelNo: 'Model No: 011A', image: 'public/overall-suits-big.jpg', description: 'Cotton Overalls With / Without Reflective' },
          { name: 'Cotton Overalls Various', modelNo: 'Model No: 011B', image: 'public/overall-suits-big.jpg', description: 'Cotton Overalls Various Sizes & Colours' }
        ]
      },
      {
        title: 'Industrial Coats & Rain Coats',
        items: [
          { name: 'Industrial Coat Blue', modelNo: 'Model No: 012', image: 'public/industrial-coat-big.jpg', description: 'Industrial Coat Blue' },
          { name: 'Industrial Coat Brown', modelNo: 'Model No: 013', image: 'public/industrial-lab-coat-big.jpg', description: 'Industrial Coat Brown' },
          { name: 'Industrial Coat Grey', modelNo: 'Model No: 014', image: 'public/industrial-coats.jpg', description: 'Industrial Coat Grey' },
          { name: 'Rain Coat 2 Piece', modelNo: 'Model No: 015', image: 'public/rain-coat-men-big.jpg', description: 'Rain Coat 2 Piece Set' },
          { name: 'Rain Coat Long', modelNo: 'Model No: 016', image: 'public/rain-coat-female.jpg', description: 'Rain Coat Long' }
        ]
      },
      {
        title: 'Accessories',
        items: [
          { name: 'Reflective Vest', modelNo: 'Model No: 017', image: 'public/reflecting-vest-big.jpg', description: 'Reflective Vest for Safety' },
          { name: 'Safety Helmet', modelNo: 'Model No: 018', image: 'public/safety-helmets.jpg', description: 'Safety Helmet' },
          { name: 'Fall Arrest System', modelNo: 'Model No: 019', image: 'public/fall-arrest-systems.jpg', description: 'Fall Arrest System' },
          { name: 'Chemical Mask', modelNo: 'Model No: 020', image: 'public/chemical-mask.jpg', description: 'Chemical Mask for Protection' },
          { name: 'Peak Cap', modelNo: 'Model No: 021', image: 'public/p-cap.jpg', description: 'Peak Cap' },
          { name: 'Security Essential', modelNo: 'Model No: 022', image: 'public/security-essentials.jpg', description: 'Security Essential Accessories' },
          { name: 'Military Lanyard', modelNo: 'Model No: 023', image: 'public/lynard.jpg', description: 'Military Lanyard' },
          { name: 'Nylon Belts', modelNo: 'Model No: 024', image: 'public/security-uniform-belt.jpg', description: 'Nylon Belts' },
          { name: 'Safety Goggles', modelNo: 'Model No: 025', image: 'public/safety-goggles.jpg', description: 'Safety Goggles' },
          { name: 'Nylon Ropes', modelNo: 'Model No: 026', image: 'public/nylon-pp-ropes.jpg', description: 'Nylon Ropes' }
        ]
      },
      {
        title: 'Gloves, Badges & Woven Labels',
        items: [
          { name: 'Leather Gloves', modelNo: 'Model No: 027', image: 'public/safety-gloves-leather.jpg', description: 'Leather Gloves' },
          { name: 'Cotton Gloves', modelNo: 'Model No: 028', image: 'public/cotton-gloves-big.jpg', description: 'Cotton Gloves' },
          { name: 'Woollen Gloves', modelNo: 'Model No: 029', image: 'public/woolen-gloves-big-1.jpg', description: 'Woollen Gloves' },
          { name: 'Roping Gloves', modelNo: 'Model No: 030', image: 'public/roping-gloves.jpg', description: 'Roping Gloves' },
          { name: 'Disposable Gloves', modelNo: 'Model No: 031', image: 'public/disposable-surgical-gloves.jpg', description: 'Disposable Gloves' },
          { name: 'Heat Resistant Gloves', modelNo: 'Model No: 032', image: 'public/heat-resistant-gloves.jpg', description: 'Heat Resistant Asbestos Gloves' },
          { name: 'Nitrile Acid Gloves', modelNo: 'Model No: 033', image: 'public/nitrile-flocklined-gloves.jpg', description: 'Nitrile Flocklined Acid Gloves' },
          { name: 'Badges & Labels Type 1', modelNo: 'Model No: 034A', image: 'public/securityguard_thumb-badges.jpg', description: 'Badges & Woven Labels' },
          { name: 'Badges & Labels Type 2', modelNo: 'Model No: 034B', image: 'public/K2_SECURITY.jpg', description: 'Badges & Woven Labels' },
          { name: 'Badges & Labels Type 3', modelNo: 'Model No: 034C', image: 'public/Run_traks-logo.jpg', description: 'Badges & Woven Labels' }
        ]
      }
    ]
  },
  // Pharmaceutical Uniforms
  'pharmaceutical': {
    title: 'Pharmaceutical Industry Uniforms',
    category: 'uniforms',
    description: 'Star Industries offer a diversified array of Pharmaceutical Uniforms for various Hospitals, Nursing Homes, Pharmacies and Health Checkup Centers. Our uniforms feature Colour Fastness, Skin Friendliness, Anti Shrinkage, Durability, Excellent Cuts & Perfect Stitch.',
    mainImage: 'public/uni-2.jpg',
    features: [
      'Colour Fastness & Skin Friendliness',
      'Anti Shrinkage & Durable',
      'Excellent Cuts & Perfect Stitch',
      'Attractive and Comfortable Designs',
      'Lint-free fabric for cleanroom environments',
      'Compliant with pharmaceutical standards'
    ],
    sections: [
      {
        title: 'Coats',
        items: [
          { name: 'Doctor Coat', modelNo: 'Model No: 035', image: 'public/doctor_coat.jpg', description: 'Doctor Coat' },
          { name: 'Doctor Coat M/F', modelNo: 'Model No: 036', image: 'public/doctor-coat-lab-coat.jpg', description: 'Doctor Coat Male & Female' },
          { name: 'Hospital Lab Coat', modelNo: 'Model No: 037', image: 'public/HOSPITAL-LAB COAT.jpg', description: 'Hospital Lab Coat' },
          { name: 'Lab Coat', modelNo: 'Model No: 038', image: 'public/labcoat.jpg', description: 'Lab Coat' }
        ]
      },
      {
        title: 'Nurse Uniform',
        items: [
          { name: 'Nurse Uniform 1', modelNo: 'Model No: 039', image: 'public/NURSE-UNI.jpg', description: 'Nurse Uniform' },
          { name: 'Nurse Uniform 2', modelNo: 'Model No: 040', image: 'public/NURSE-UNIFORM-022.jpg', description: 'Nurse Uniform' },
          { name: 'Nurse Uniform 3', modelNo: 'Model No: 041', image: 'public/NURSE-UNIFORMS-023.jpg', description: 'Nurse Uniform' },
          { name: 'Nurse Uniform 4', modelNo: 'Model No: 042', image: 'public/nurse_uniform-018.jpg', description: 'Nurse Uniform' },
          { name: 'Nurse Uniform 5', modelNo: 'Model No: 043', image: 'public/NURSE-UNIF-020.jpg', description: 'Nurse Uniform' }
        ]
      },
      {
        title: 'Intern Uniforms & Surgical Gowns',
        items: [
          { name: 'Intern Uniform/Surgical Gown 1', modelNo: 'Model No: 044', image: 'public/hospital-uniform-008.jpg', description: 'Intern Uniforms / Surgical Gowns' },
          { name: 'Intern Uniform/Surgical Gown 2', modelNo: 'Model No: 045', image: 'public/HOSPITAL-UNIFORMS-009.jpg', description: 'Intern Uniforms / Surgical Gowns' },
          { name: 'Intern Uniform/Surgical Gown 3', modelNo: 'Model No: 046', image: 'public/HOSPITAL-UNIFORMS-010.jpg', description: 'Intern Uniforms / Surgical Gowns' },
          { name: 'Intern Uniform Trouser', modelNo: 'Model No: 047', image: 'public/ladies-bottle-green-uniform-trouser-nurse-vet-beautician-015.jpg', description: 'Intern Uniforms / Trouser' },
          { name: 'Surgical Coat', modelNo: 'Model No: 048', image: 'public/InternUniform-HOSPITAL-013.png', description: 'Intern Uniforms / Surgical Coat' },
          { name: 'Intern Uniform/Surgical Gown 4', modelNo: 'Model No: 049', image: 'public/Medical_Uniforms_&_Scrubs-016.jpg', description: 'Intern Uniforms / Surgical Gowns' },
          { name: 'Medical Robe', modelNo: 'Model No: 050', image: 'public/Robe-for-Medical-Personnel-024.jpg', description: 'Robe For Medical Personnel' },
          { name: 'Medical/Dental Scrubs', modelNo: 'Model No: 051', image: 'public/scrubs-for medical-dental-025.jpg', description: 'Medical / Dental Scrubs' },
          { name: 'Medical Intern Uniform', modelNo: 'Model No: 052', image: 'public/medical-intern-uniform.jpg', description: 'Medical Intern Uniform' },
          { name: 'Surgical Gown', modelNo: 'Model No: 053', image: 'public/Surgical-Gowns.jpg', description: 'Surgical Gown' }
        ]
      },
      {
        title: 'Ward Boy / Lady Uniforms',
        items: [
          { name: 'Ward Boy Uniform Green', modelNo: 'Model No: 054', image: 'public/HOSPITAL-WARD BOY- DISPOSABLE FEET MASK-011.jpg', description: 'Ward Boy Uniform - Green' },
          { name: 'Ward Boy Uniform Blue', modelNo: 'Model No: 055', image: 'public/HOSPITAL-WARD BOY-012.jpg', description: 'Ward Boy Uniform - Blue' },
          { name: 'Ward Lady Uniform', modelNo: 'Model No: 056', image: 'public/NURSE-UNIFORM-021.jpg', description: 'Ward Lady Uniform' }
        ]
      },
      {
        title: 'Accessories',
        items: [
          { name: 'Disposable Foot Mask', modelNo: 'Model No: 057', image: 'public/DISPOSABLE-FOOT-MASK-001.jpg', description: 'Disposable Foot Mask' },
          { name: 'Disposable Nose Masks', modelNo: 'Model No: 058', image: 'public/disposable-nose-mask.jpg', description: 'Disposable Nose Masks' },
          { name: 'Re-Usable Face Mask', modelNo: 'Model No: 059', image: 'public/face-mask.png', description: 'Re-Usable Face Mask' },
          { name: 'Surgical Gloves', modelNo: 'Model No: 060', image: 'public/disposable-surgical-gloves.jpg', description: 'Disposable Surgical Gloves' },
          { name: 'PVC Apron', modelNo: 'Model No: 061', image: 'public/HOSPITAL-PVC -APRONS-007.jpg', description: 'PVC Apron' }
        ]
      }
    ]
  },
  // Hotel/Food Industry Uniforms
  'food': {
    title: 'Food Industry Uniforms',
    category: 'uniforms',
    description: 'Leveraging on our sophisticated infrastructure, we are engaged in manufacturing and supplying a wide range of Hotel and Restaurant Uniforms. Our Uniforms are highly comfortable, shrinkage free and easy to wash. Uniforms are provided with stitched logo or customized specifications.',
    mainImage: 'public/uni-3.jpg',
    features: [
      'Anti-Pilling & Shrinkage Control',
      'Colour Fastness & Durability',
      'Soft-Finish and Skin Friendly',
      'Custom logo embroidery available',
      'Made from Polyester Viscose, Cotton, Polyester Cotton',
      'Cost effective prices'
    ],
    sections: [
      {
        title: 'Chef Coats & Chef Uniforms',
        items: [
          { name: 'Chef Coat With Specifications', modelNo: 'Model No: 062', image: 'public/chef-reguler-014.jpg', description: 'Chef Coat With Specifications' },
          { name: 'Chef Uniform Black Contrast', modelNo: 'Model No: 063', image: 'public/black-contrast-chef-coat-set-004.jpg', description: 'Chef Uniform Black Contrast' },
          { name: 'Chef Coat Black Contrast', modelNo: 'Model No: 064', image: 'public/Chef-Uniform-016.jpg', description: 'Chef Coat Black Contrast' },
          { name: 'Chef Coat Plain', modelNo: 'Model No: 065', image: 'public/chef-coat-010.jpg', description: 'Chef Coat Plain' },
          { name: 'Chef Coat Black Piping', modelNo: 'Model No: 066', image: 'public/chef-coat-012.jpg', description: 'Chef Coat With Black Piping' },
          { name: 'Chef Coat Blue Contrast', modelNo: 'Model No: 067', image: 'public/Chef_Coat-007.jpg', description: 'Chef Coat Blue Contrast' },
          { name: 'Chef Coat Black', modelNo: 'Model No: 068', image: 'public/chef-black.jpg', description: 'Chef Coat Black' },
          { name: 'Chef Coat Ordinary', modelNo: 'Model No: 069', image: 'public/chef uniform-005.jpg', description: 'Chef Coat Ordinary' },
          { name: 'Chef Uniform M/F 1', modelNo: 'Model No: 070', image: 'public/chef-coat-male -female-013.jpg', description: 'Chef Uniforms Male & Female' },
          { name: 'Chef Uniform M/F 2', modelNo: 'Model No: 071', image: 'public/chef-uniform-015.jpg', description: 'Chef Uniforms Male & Female' }
        ]
      },
      {
        title: 'Aprons & Chef Caps',
        items: [
          { name: 'Apron Men Stripes', modelNo: 'Model No: 072', image: 'public/adult-apron-butchers-stripe-001.jpg', description: 'Apron For Men With Stripes' },
          { name: 'Apron Men Plain', modelNo: 'Model No: 073', image: 'public/APRONS-002.jpg', description: 'Apron For Men Plain' },
          { name: 'Apron Women Stripes', modelNo: 'Model No: 074', image: 'public/ladies-apron.jpg', description: 'Apron For Women With Stripes' },
          { name: 'Half Apron Unisex', modelNo: 'Model No: 075', image: 'public/HALF-APRON-022.jpg', description: 'Half Apron Unisex' },
          { name: 'Dish Washing Apron Men', modelNo: 'Model No: 076', image: 'public/dish-washer-apron.jpg', description: 'Dish Washing Apron For Men' },
          { name: 'Dish Washing Apron Women', modelNo: 'Model No: 077', image: 'public/dish-washer-apron-ladies.jpg', description: 'Dish Washing Apron For Women' },
          { name: 'Chef Cap White', modelNo: 'Model No: 078', image: 'public/chef-cap.jpg', description: 'Chef Cap White' },
          { name: 'Chef Cap Contrast', modelNo: 'Model No: 079', image: 'public/chef-cap-029.jpg', description: 'Chef Cap Black & White Contrast' },
          { name: 'Chef Cap Patterns', modelNo: 'Model No: 080', image: 'public/chef-caps.jpg', description: 'Chef Caps - Black Striped & Checked' },
          { name: 'Chef Cap Non Woven', modelNo: 'Model No: 081', image: 'public/Non-Woven-Chef-Cap.jpg', description: 'Chef Cap Non Woven' }
        ]
      },
      {
        title: 'Front Office / Front Desk Uniforms',
        items: [
          { name: 'Vest Coat V-Neck', modelNo: 'Model No: 082', image: 'public/basic-v-neck-vest-coats.jpg', description: 'Front Office Vest Coats - V-Neck' },
          { name: 'Vest Coat With Tie', modelNo: 'Model No: 083', image: 'public/front_office-017.jpg', description: 'Front Office Vest Coat - With Tie' },
          { name: 'Vest Coat Without Tie', modelNo: 'Model No: 084', image: 'public/front_office-018.jpg', description: 'Front Office Vest Coat - Without Tie' },
          { name: 'Vest Coat Back', modelNo: 'Model No: 085', image: 'public/front_office-back-019.jpg', description: 'Front Office Vest Coat - Back' },
          { name: 'Black Trouser Coat & Bow', modelNo: 'Model No: 086', image: 'public/black-trouser-coat-bow.jpg', description: 'Black Trouser Coat & Bow' },
          { name: 'Captain Coats', modelNo: 'Model No: 087', image: 'public/captain-coats.jpg', description: 'Captain Coats Men & Women' },
          { name: 'Front Office M/F 1', modelNo: 'Model No: 088', image: 'public/front-office-uniform-020.jpg', description: 'Front Office Men & Women' },
          { name: 'Front Office M/F 2', modelNo: 'Model No: 089', image: 'public/front-off.jpg', description: 'Front Office Men & Women' },
          { name: 'Front Office Ladies', modelNo: 'Model No: 090', image: 'public/front-office-ladies-staff-uniforms.jpg', description: 'Front Office Ladies Uniforms' },
          { name: 'Front Desk Ladies', modelNo: 'Model No: 091', image: 'public/front-desk.jpg', description: 'Front Desk Ladies Uniform' }
        ]
      },
      {
        title: 'Waiter / House-Keeping / Room Service Uniforms',
        items: [
          { name: 'Waiter Uniform M/F', modelNo: 'Model No: 092', image: 'public/waiter-uniform-027.jpg', description: 'Waiter Uniform Men & Women' },
          { name: 'Waiter Blazer Bow', modelNo: 'Model No: 093', image: 'public/waiter-uniform-029.jpg', description: 'Waiter Uniform Blazer With Bow' },
          { name: 'T-Shirt Piping', modelNo: 'Model No: 094', image: 'public/polo-t shirts-waiter.jpg', description: 'T-Shirts - For Waiters With Piping' },
          { name: 'T-Shirt No Piping', modelNo: 'Model No: 095', image: 'public/t-shirts-men & women.jpg', description: 'T-Shirts - For Waiters Without Piping' },
          { name: 'T-Shirt Various Colors', modelNo: 'Model No: 096', image: 'public/T- Shirt-waiter -colours.jpg', description: 'T-Shirts - For Waiters Various Colours' },
          { name: 'Bell Boy Uniform', modelNo: 'Model No: 097', image: 'public/bell-boy-uniform-003.jpg', description: 'Bell Boy Uniform' },
          { name: 'Butler Uniform', modelNo: 'Model No: 098', image: 'public/butler-uniforms-030.jpg', description: 'Butler Uniform' },
          { name: 'House Keeping Men', modelNo: 'Model No: 099', image: 'public/housekeeping-uniform-023.jpg', description: 'House Keeping Uniform - Men' },
          { name: 'House Keeping Women', modelNo: 'Model No: 100', image: 'public/housekeeping-utility-uniform.jpg', description: 'House Keeping Uniform - Women' },
          { name: 'Room Service Uniform', modelNo: 'Model No: 101', image: 'public/room-service.jpg', description: 'Room Service Uniform' }
        ]
      }
    ]
  },
  // Government Sector Uniforms
  'government': {
    title: 'Government Sector Uniforms',
    category: 'uniforms',
    description: 'Star Industries provide a wide range of Police Uniform Wear. Our cutting edge technology facilitates us in effective production of uniforms which are accurately designed, seamlessly stitched, durable and stands high on quality. We also specialize in supplying fabric with specific color requirements along with all accessories.',
    mainImage: 'public/uni-4.jpg',
    features: [
      'Customized braiding and embroidery designs',
      'Specific color requirements met',
      'All kinds of accessories available',
      'Accurately designed & seamlessly stitched',
      'Durable and stands high on quality',
      'Complete uniform essentials'
    ],
    sections: [
      {
        title: 'Police Uniform & Thier Accessories',
        items: [
          { name: 'Police Uniform', modelNo: 'Model No: 102', image: 'public/police.jpg', description: 'Police Uniform' },
          { name: 'Police Essentials', modelNo: 'Model No: 103', image: 'public/police-uniform-essentials.jpg', description: 'Police Essentials' },
          { name: 'Navy Officer Admiral Cap', modelNo: 'Model No: 104', image: 'public/big-u-navy-officer-admiral-khaki-hat-1.jpg', description: 'Navy Officer Admiral - Cap' },
          { name: 'Police Cap IPS', modelNo: 'Model No: 105', image: 'public/ips-cap.jpg', description: 'Police Cap - IPS' },
          { name: 'Police Cap All Cadres', modelNo: 'Model No: 106', image: 'public/police-caps-all types.jpg', description: 'Police Cap For All Cadres' },
          { name: 'Beret Cap Front', modelNo: 'Model No: 107-A', image: 'public/beret cap.jpg', description: 'Beret Cap - Front' },
          { name: 'Beret Cap Back', modelNo: 'Model No: 107-B', image: 'public/beret-cap-back.jpg', description: 'Beret Cap - Back' },
          { name: 'Beret Cap Khakhi', modelNo: 'Model No: 108', image: 'public/beret-cap-khaki.jpg', description: 'Beret Cap - Khakhi' },
          { name: 'Police Belt 1', modelNo: 'Model No: 109', image: 'public/belt-buckle.jpg', description: 'Police Belt' },
          { name: 'Police Belt 2', modelNo: 'Model No: 110', image: 'public/police-belt.jpg', description: 'Police Belt' },
          { name: 'Police Belt Buckle', modelNo: 'Model No: 111', image: 'public/police-buckle.jpg', description: 'Police Belt Buckle' },
          { name: 'Belt With Pistol Pouch', modelNo: 'Model No: 112', image: 'public/police-belt-with bullet pouch.jpg', description: 'Police Belt With Pistol Pouch' },
          { name: 'Shoulder Flap With Stars', modelNo: 'Model No: 113', image: 'public/shoulder flap-with stars.jpg', description: 'Shoulder Flap With Stars' },
          { name: 'Collar Devices Stars', modelNo: 'Model No: 114', image: 'public/vice-admiral-lt-general-collar-devices.jpg', description: 'Collar Devices Stars' },
          { name: 'Collar Devices Ribbon', modelNo: 'Model No: 118', image: 'public/ribbon-mount-7-ribbons.jpg', description: 'Collar Devices Metal Ribbon' },
          { name: 'Police Buttons Steel', modelNo: 'Model No: 119', image: 'public/police-button-steel.jpg', description: 'Police Buttons Police Imprinted - Steel' },
          { name: 'P Buttons Steel', modelNo: 'Model No: 120', image: 'public/p-steel-button.jpg', description: 'Police Buttons P Imprinted - Steel' },
          { name: 'Buttons Brass', modelNo: 'Model No: 121', image: 'public/police buttons.jpg', description: 'Police Buttons Brass' },
          { name: 'Defence Service Ribbon', modelNo: 'Model No: 122', image: 'public/national-defense-service-ribbon.jpg', description: 'National Defence Service Ribbon' },
          { name: 'Silver Star Ribbon', modelNo: 'Model No: 123', image: 'public/silver-star-ribbon.jpg', description: 'Silver Star Service Ribbon' }
        ]
      }
    ]
  },
  // School/College Uniforms
  'school-uniform': {
    title: 'Schools / Colleges Uniforms',
    category: 'uniforms',
    description: 'Star Industries is a leading Manufacturer and Supplier of a wide range of School & College Uniforms along with complete set of accessories. We use only quality fabrics to make our products comfortable and to ensure non-fading due to repeated washings. These uniforms are offered in distinctive style and are fabricated from the finest fabric.',
    mainImage: 'public/uni-5.jpg',
    features: [
      'Quality fabrics ensuring comfort',
      'Non-fading due to repeated washings',
      'Perfect cuts and stitching',
      'Reasonable price range',
      'Custom logo imprinting available',
      'Complete set of accessories'
    ],
    sections: [
      {
        title: 'School / College Uniforms',
        items: [
          { name: 'School Uniform All Class', modelNo: 'Model No: 124', image: 'public/school-uniform-for all class-range-boys & girls.jpg', description: 'School Uniform - Boys & Girls All Class Range' },
          { name: 'High School With Blazers', modelNo: 'Model No: 125', image: 'public/high-school-uniform.jpg', description: 'High School Uniform With Blazers & School Logo Imprinted' },
          { name: 'Various Patterns', modelNo: 'Model No: 126', image: 'public/school-uniforms.jpg', description: 'School Uniform - Boys & Girls Various Patterns' },
          { name: 'Lower Classes', modelNo: 'Model No: 127', image: 'public/lower-classes.jpg', description: 'School Uniform - Boys & Girls For Lower Classes' },
          { name: 'Full Pant Full Sleeves', modelNo: 'Model No: 128', image: 'public/School-Uniform - full-pant-full sleeves.jpg', description: 'School Uniform Full Pant - Full Sleeves' },
          { name: 'Full Pant Half Sleeves', modelNo: 'Model No: 129', image: 'public/full-pant-half-sleeves.jpg', description: 'School Uniform Full Pant - Half Sleeves' },
          { name: 'Shirts With Logo', modelNo: 'Model No: 130', image: 'public/school.jpg', description: 'School Uniform Shirts - With Logo' },
          { name: 'Girls Pinnafore Kindergarten', modelNo: 'Model No: 131', image: 'public/girls_school_uniform_jumper.jpg', description: 'Girls Pinnafore Kindergarten' },
          { name: 'Girls Pinnafore Lower', modelNo: 'Model No: 132', image: 'public/girls-uniform-school.jpg', description: 'Girls Pinnafore Lower Classes' },
          { name: 'Pinnafore Full Sleeves', modelNo: 'Model No: 133', image: 'public/girls-uniform-school.jpg', description: 'Girls Pinnafore With Collar & Full Sleeves' },
          { name: 'High School Jacket Girls', modelNo: 'Model No: 134', image: 'public/school-uniform-with-jacket-girls.jpg', description: 'High School Uniform With Jacket - Girls' },
          { name: 'High School OverCoat Girls', modelNo: 'Model No: 135', image: 'public/senior-girls-uniform-with-overcoat.jpg', description: 'High School Uniform With OverCoat - Girls' },
          { name: 'High School Dupatta Girls', modelNo: 'Model No: 136', image: 'public/salwar-kameez-school-uniform-with dupatta.jpg', description: 'High School Uniform With Dupatta - Girls' },
          { name: 'Workshop Uniform 1', modelNo: 'Model No: 137', image: 'public/workshop.jpg', description: 'Workshop Uniform For Diploma Students' },
          { name: 'Workshop Uniform 2', modelNo: 'Model No: 138', image: 'public/workshop-uniform.jpg', description: 'Workshop Uniform For Diploma Students' },
          { name: 'College Uniform M/F 1', modelNo: 'Model No: 139', image: 'public/college-uniform-male & femal.jpg', description: 'College Uniform Male & Female' },
          { name: 'College Uniform M/F 2', modelNo: 'Model No: 140', image: 'public/college-uniforms.jpg', description: 'College Uniform Male & Female' },
          { name: 'College Blazers', modelNo: 'Model No: 141', image: 'public/college-uniforms-.jpg', description: 'College Uniform Blazers' },
          { name: 'Business Uniform Sales', modelNo: 'Model No: 142', image: 'public/Business-Uniform.jpg', description: 'Business Uniform For Sales Persons' }
        ]
      },
      {
        title: 'School / College Sports Uniforms',
        items: [
          { name: 'Sports Full Pants', modelNo: 'Model No: 143', image: 'public/fullpant-sports.jpg', description: 'Sports Uniform Full Pants' },
          { name: 'Sports Half Pants', modelNo: 'Model No: 144', image: 'public/school-sports-uniform.jpg', description: 'Sports Uniform Half Pants' },
          { name: 'Sports Polo T-Shirts', modelNo: 'Model No: 145', image: 'public/Polo-Neck-T-Shirts-.jpg', description: 'Sports Uniform Polo Neck T-Shirts' },
          { name: 'Sports T-Shirts', modelNo: 'Model No: 146', image: 'public/t-shirts.jpg', description: 'Sports T-Shirts Various Types' },
          { name: 'Track Suits', modelNo: 'Model No: 147', image: 'public/track-suit-sports.jpg', description: 'Sports Essentials Track Suits' },
          { name: 'March Past Boys & Girls', modelNo: 'Model No: 148', image: 'public/March-past-uniform.jpg', description: 'March Past Uniform For Boys & Girls' },
          { name: 'March Past Jackets Girls', modelNo: 'Model No: 149', image: 'public/sports-uni-for-girls.jpg', description: 'March Past Uniform For Girls With Jackets & Beret Caps' },
          { name: 'Sports Skirt Blouse Girls', modelNo: 'Model No: 150', image: 'public/sports-uni-girls.jpg', description: 'Sports Uniform Skirt & Blouse For Girls' },
          { name: 'NCC Uniform', modelNo: 'Model No: 151', image: 'public/NCC-essentials.jpg', description: 'NCC Uniform With Ceremonial Accessories' }
        ]
      },
      {
        title: 'School / College Uniform Accessories',
        items: [
          { name: 'Caps With Logo', modelNo: 'Model No: 152-A', image: 'public/caps-fron-back.jpg', description: 'Caps With Logo Front & Back' },
          { name: 'Caps More Types', modelNo: 'Model No: 152-B', image: 'public/Caps.jpg', description: 'Caps With Logo More...' },
          { name: 'Cabbie Flat Caps', modelNo: 'Model No: 153', image: 'public/Cabbie-Flat-cap.jpg', description: 'Cabbie Flat Caps' },
          { name: 'School Belts Plain', modelNo: 'Model No: 154', image: 'public/school belts.jpg', description: 'School Belts Plain' },
          { name: 'School Belts Printed', modelNo: 'Model No: 155', image: 'public/school-belts-with school name -imprinted.jpg', description: 'School Belts With School Name Printed' },
          { name: 'Belt Buckles Logo', modelNo: 'Model No: 156', image: 'public/School-Belts-buckles.jpg', description: 'Belts Buckles With School Name & Logo' },
          { name: 'College Belts', modelNo: 'Model No: 157', image: 'public/leather belt-for colleges- brwn.jfif', description: 'College Belts Black & Brown' },
          { name: 'Identity Cards', modelNo: 'Model No: 158', image: 'public/ID-cards.png', description: 'School /College Identity Cards' },
          { name: 'ID Card Tag', modelNo: 'Model No: 159', image: 'public/ID-CARDS-tAG.jpg', description: 'ID Card Tag With School / College Name' },
          { name: 'Ties Striped', modelNo: 'Model No: 160', image: 'public/school-tie-250x250.jpg', description: 'Ties Striped' },
          { name: 'Ties Various Patterns', modelNo: 'Model No: 161', image: 'public/ties.jpg', description: 'Ties Various Patterns' },
          { name: 'Nylon Socks Black', modelNo: 'Model No: 162', image: 'public/nylon-socks-black.jpg', description: 'Socks Nylon - Black' },
          { name: 'Nylon Socks White', modelNo: 'Model No: 163', image: 'public/nylon-socks-white.jpg', description: 'Socks Nylon - White' },
          { name: 'Nylon Socks Colors', modelNo: 'Model No: 164', image: 'public/nylon-blue-black-white.jpg', description: 'Nylon Socks Black - White - Blue' },
          { name: 'Cotton Socks Black', modelNo: 'Model No: 165', image: 'public/cotton-black.jpg', description: 'Socks Cotton - Black' },
          { name: 'Cotton Socks White', modelNo: 'Model No: 166', image: 'public/cotton-white.jpg', description: 'Socks Cotton - White' },
          { name: 'Cotton Socks Grey', modelNo: 'Model No: 167', image: 'public/cotton-grey.jpg', description: 'Socks Cotton - Grey' },
          { name: 'Cotton Socks All Colors 1', modelNo: 'Model No: 168', image: 'public/cotton-socks-all colours.jpg', description: 'Cotton Socks All Colours' },
          { name: 'Cotton Socks All Colors 2', modelNo: 'Model No: 169', image: 'public/cotton-for colleges.jpg', description: 'Cotton Socks All Colours More...' },
          { name: 'Cotton Socks Knee Length', modelNo: 'Model No: 170', image: 'public/knee-length-school-socks-cotton.jpg', description: 'Cotton Socks Knee - Length' }
        ]
      }
    ]
  },
  // Industrial Shoes
  'industrial-shoes': {
    title: 'Industrial Shoes',
    category: 'shoes',
    description: 'Heavy-duty footwear designed for industrial environments with superior protection.',
    mainImage: 'public/sh-1.jpg',
    features: [
      'Steel toe protection',
      'Anti-slip soles',
      'Oil and chemical resistant',
      'Shock absorbing midsole',
      'Breathable lining',
      'Durable leather upper'
    ],
    sections: [],
  },
  'safety-shoes': {
    title: 'Safety & Security Shoe',
    category: 'shoes',
    description: 'Premium safety shoes with steel toe caps and slip-resistant soles. Our safety shoes are designed to protect your feet in hazardous work environments.',
    mainImage: 'public/sh-2.png',
    features: [
      'IS 15298 certified',
      'Steel/composite toe cap',
      'Anti-puncture sole',
      'ESD properties',
      'Heat resistant',
      'Comfortable padding'
    ],
    sections: [],
  },
  'uniform-shoes': {
    title: 'Uniform Shoe',
    category: 'shoes',
    description: 'Professional uniform shoes for corporate and institutional use. Our uniform shoes combine style with comfort for daily professional wear.',
    mainImage: 'public/sh-3.png',
    features: [
      'Genuine leather upper',
      'Cushioned insole',
      'Professional look',
      'Long-lasting polish',
      'Comfortable fit',
      'Multiple width options'
    ],
    sections: [],
  },
  'executive-shoes': {
    title: 'Executive Shoe',
    category: 'shoes',
    description: 'Elegant formal leather shoes for executives and professionals. Our executive shoes are crafted with premium leather for a sophisticated look.',
    mainImage: 'public/sh-4.png',
    features: [
      'Premium leather',
      'Hand-finished',
      'Memory foam insole',
      'Blake stitched construction',
      'Elegant design',
      'All-day comfort'
    ],
    sections: [],
  },
  'school-shoes': {
    title: 'Schools / Colleges Shoe',
    category: 'shoes',
    description: 'Comfortable and durable shoes for students of all ages. Our school shoes are designed to withstand daily wear while keeping young feet comfortable.',
    mainImage: 'public/sh-5.jpg',
    features: [
      'Durable construction',
      'Comfortable fit',
      'Easy to polish',
      'Anti-skid soles',
      'Breathable lining',
      'Available in all sizes'
    ],
    sections: []
  }
};

export default function ProductDetail() {

  const [searchParams] = useSearchParams();
  const subcategoryParam = searchParams.get('subcategory') || 'automobile';
  const hasStatic = !!productData[subcategoryParam];

  const [product, setProduct] = useState(
    hasStatic
      ? productData[subcategoryParam]
      : null
  );
  const [selectedPart, setSelectedPart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {

    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError('');
        const data = await apiFetch(`/products/${subcategoryParam}`);
        if (!mounted || !data) return;
        setProduct({
          title: data.title,
          category: data.category,
          description:
            data.summary ||
            data.description ||
            (hasStatic ? productData[subcategoryParam]?.description || '' : ''),
          mainImage:
            data.mainImage ||
            (hasStatic ? productData[subcategoryParam]?.mainImage || '' : ''),
          features: Array.isArray(data.features)
            ? data.features
            : hasStatic
              ? productData[subcategoryParam]?.features || []
              : [],
          sections: Array.isArray(data.sections)
            ? data.sections.map((s) => ({
              title: s.title,
              items: Array.isArray(s.items)
                ? s.items.map((it) => ({
                  name: it.name,
                  modelNo: it.modelNo || '',
                  description: it.description || '',
                  image: it.image || '',
                }))
                : [],
            }))
            : hasStatic
              ? productData[subcategoryParam]?.sections || []
              : [],
        });
      } catch {
        if (hasStatic) {
          setProduct(productData[subcategoryParam]);
        } else {
          setProduct(null);
          setError('Product not found');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [subcategoryParam, hasStatic]);

  useEffect(() => {
    setSelectedPart(null);

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [subcategoryParam]);

  if (loading && !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <p className="text-center text-gray-500">Loading product...</p>
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <p className="text-center text-red-600">{error}</p>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="overflow-hidden">

      {/* Breadcrumb */}
      <section className="bg-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to={createPageUrl('Home')} className="text-gray-500 hover:text-[#1e3a5f]">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link to={createPageUrl('Products')} className="text-gray-500 hover:text-[#1e3a5f]">Products</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link to={createPageUrl(`Products?category=${product.category}`)} className="text-gray-500 hover:text-[#1e3a5f] capitalize">{product.category}</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-[#1e3a5f] font-medium">{product.title}</span>
          </nav>
        </div>
      </section>

      {/* Product Hero */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <span className="inline-block px-3 py-1 bg-[#c9a962]/20 text-[#c9a962] rounded-full text-sm font-medium mb-4 capitalize">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1e3a5f]">
              {product.title}
            </h1>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <ImageZoom
                src={resolveAssetPath(product.mainImage)}
                alt={product.title}
                className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg"
              />

            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <p className="text-gray-600 leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#1e3a5f] mb-4">Key Features</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#c9a962] shrink-0" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <p className="text-[#1e3a5f] font-medium mb-4">For Enquiry & Quick Delivery:</p>
                <div className="flex flex-row gap-4">
                  <a
                    href="tel:+919884451005"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#1e3a5f] text-white font-medium rounded-lg hover:bg-[#2d5a8f] transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </a>
                  <a
                    href="mailto:sales@starindus.com"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#c9a962] text-[#1e3a5f] font-medium rounded-lg hover:bg-[#dbb872] transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Parts */}
      {product.category === 'uniforms' && (
        <section className="py-2 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-[#c9a962] font-medium tracking-wider uppercase text-sm">Product Range</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mt-4">
                Uniform Components
              </h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                All products are available in various sizes and can be customized.
              </p>
            </motion.div>

            {product.sections && product.sections.length > 0 && (
              product.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-16 last:mb-0">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl font-bold text-[#1e3a5f] mb-8 flex items-center gap-4"
                  >
                    <span className="w-12 h-1 bg-[#c9a962]"></span>
                    {section.title}
                  </motion.h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {section.items.map((part, index) => (
                      <motion.div
                        key={part.name}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group cursor-pointer"
                        onClick={() => setSelectedPart(part)}
                      >
                        <div className="bg-white rounded-2xl overflow-hidden card-surface">
                          <div className="relative aspect-square overflow-hidden">
                            <img
                              src={resolveAssetPath(part.image)}
                              alt={part.name}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <ZoomIn className="w-10 h-10 text-white drop-shadow-lg" />
                            </div>
                          </div>
                          <div className="p-6 text-center">
                            <h3 className="text-lg font-bold text-[#1e3a5f] group-hover:text-[#2d5a8f] transition-colors mb-2">
                              {part.name}
                            </h3>
                            <p className="text-xs text-[#c9a962] font-medium">{part.modelNo}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))
            )}

          </div>
        </section>
      )}

      {/* Part Detail Modal */}
      <AnimatePresence>
        {selectedPart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setSelectedPart(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl flex flex-col"

              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-72 sm:h-80 lg:h-[28rem] overflow-hidden">
                <img
                  src={resolveAssetPath(selectedPart.image)}
                  alt={selectedPart.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />

              </div>
              <div className="p-8 text-center flex-1 overflow-y-auto">
                <h3 className="text-2xl font-bold text-[#1e3a5f] mb-1">{selectedPart.name}</h3>
                <p className="text-sm text-[#c9a962] font-medium mb-4">{selectedPart.modelNo}</p>
                <p className="text-gray-600 mb-6">{selectedPart.description}</p>

                <div className="flex gap-4 justify-center">
                  <a
                    href="tel:+919884451005"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#1e3a5f] text-white font-medium rounded-lg hover:bg-[#2d5a8f] transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Enquire Now
                  </a>
                  <button
                    onClick={() => setSelectedPart(null)}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Products */}
      <section className="py-8 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4">
          <Link
            to={createPageUrl('Products')}
            className="inline-flex items-center gap-2 text-[#1e3a5f] hover:text-[#c9a962] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Products
          </Link>
        </div>
      </section>
    </div>
  );
}