import { query, getClient } from '../db.js';

async function upsertProduct(p) {
  const client = await getClient();
  try {
    await client.query('BEGIN');
    const res = await client.query('SELECT id FROM products WHERE slug=$1', [p.slug]);
    let prodId;
    if (res.rows.length) {
      prodId = res.rows[0].id;
      await client.query(
        'UPDATE products SET title=$1, category=$2, model_no=$3, summary=$4, main_image=$5, features=$6, updated_at=now() WHERE id=$7',
        [p.title, p.category, p.modelNo || null, p.summary || null, p.mainImage || null, p.features || [], prodId]
      );
      await client.query('DELETE FROM section_items WHERE section_id IN (SELECT id FROM sections WHERE product_id=$1)', [prodId]);
      await client.query('DELETE FROM sections WHERE product_id=$1', [prodId]);
    } else {
      const ins = await client.query(
        'INSERT INTO products (slug, title, category, model_no, summary, main_image, features) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id',
        [p.slug, p.title, p.category, p.modelNo || null, p.summary || null, p.mainImage || null, p.features || []]
      );
      prodId = ins.rows[0].id;
    }

    for (let i = 0; i < (p.sections || []).length; i++) {
      const sec = p.sections[i];
      const secIns = await client.query(
        'INSERT INTO sections (product_id, heading, position) VALUES ($1,$2,$3) RETURNING id',
        [prodId, sec.title, i]
      );
      const secId = secIns.rows[0].id;
      for (let j = 0; j < (sec.items || []).length; j++) {
        const it = sec.items[j];
        await client.query(
          'INSERT INTO section_items (section_id, name, model_no, description, image, position) VALUES ($1,$2,$3,$4,$5,$6)',
          [secId, it.name, it.modelNo || null, it.description || null, it.image || null, j]
        );
      }
    }

    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

async function main() {
  const products = [
    {
      slug: 'automobile',
      title: 'Automobile, Industrial & Security Uniforms',
      category: 'uniforms',
      summary: 'Collection for industrial and security uniforms.',
      mainImage: '/uni-1.jpg',
      features: [
        'High durability',
        'Comfortable fit',
      ],
      sections: [
        {
          title: 'Industrial & Security Work Wear',
          items: [
            { name: 'Corporate Uniform', modelNo: 'Model No: 001', description: 'Industrial & Security Work Wear Corporate Uniform', image: '/corporate-uniforms-big.jpg' },
            { name: 'Factory Uniform Front', modelNo: 'Model No: 002A', description: 'Factory Uniform Front View', image: '/FACTORY-UNIFORM-front.jpg' },
            { name: 'Factory Uniform Back', modelNo: 'Model No: 002B', description: 'Factory Uniform Back View', image: '/FACTORY-UNIFORMS.jpg' },
            { name: 'Worker Uniform', modelNo: 'Model No: 003', description: 'Worker Uniform for Industrial Use', image: '/worker-uniform.jpg' },
            { name: 'Security Uniform Complete', modelNo: 'Model No: 004', description: 'Security Uniform With All Specifications', image: '/security-uniforms-with specification.jpg' },
            { name: 'Security Uniform Black Male', modelNo: 'Model No: 005A', description: 'Security Uniform Black - Male', image: '/Radiant-men.jpg' },
            { name: 'Security Uniform Black Female', modelNo: 'Model No: 005B', description: 'Security Uniform Black - Female', image: '/radiant-lady-uniform.jpg' }
          ]
        },
        {
          title: 'Boiler Suits / Overalls / Coveralls',
          items: [
            { name: 'Boiler Suits Standard', modelNo: 'Model No: 006', description: 'Boiler Suits / Overalls / Coveralls', image: '/boiler-suits-big.jpg' },
            { name: 'Boiler Suits M/F', modelNo: 'Model No: 007', description: 'Boiler Suits Male & Female', image: '/Boiler-Suits-men&women-big.jpg' },
            { name: 'Overalls With Reflective', modelNo: 'Model No: 008', description: 'Overalls With Reflective Strips', image: '/boiler-suit-with-reflective-big.jpg' },
            { name: 'Overalls Without Reflective', modelNo: 'Model No: 009', description: 'Overalls Without Reflective', image: '/boiler-suit-without-reflective.jpg' },
            { name: 'Coveralls Blue', modelNo: 'Model No: 010', description: 'Coveralls Blue Color', image: '/coverall-big.jpg' },
            { name: 'Cotton Overalls Reflective', modelNo: 'Model No: 011A', description: 'Cotton Overalls With / Without Reflective', image: '/overall-suits-big.jpg' },
            { name: 'Cotton Overalls Various', modelNo: 'Model No: 011B', description: 'Cotton Overalls Various Sizes & Colours', image: '/overall-suits-big.jpg' }
          ]
        },
        {
          title: 'Industrial Coats & Rain Coats',
          items: [
            { name: 'Industrial Coat Blue', modelNo: 'Model No: 012', description: 'Industrial Coat Blue', image: '/industrial-coat-big.jpg' },
            { name: 'Industrial Coat Brown', modelNo: 'Model No: 013', description: 'Industrial Coat Brown', image: '/industrial-lab-coat-big.jpg' },
            { name: 'Industrial Coat Grey', modelNo: 'Model No: 014', description: 'Industrial Coat Grey', image: '/industrial-coats.jpg' },
            { name: 'Rain Coat 2 Piece', modelNo: 'Model No: 015', description: 'Rain Coat 2 Piece Set', image: '/rain-coat-men-big.jpg' },
            { name: 'Rain Coat Long', modelNo: 'Model No: 016', description: 'Rain Coat Long', image: '/rain-coat-female.jpg' }
          ]
        },
        {
          title: 'Accessories',
          items: [
            { name: 'Reflective Vest', modelNo: 'Model No: 017', description: 'Reflective Vest for Safety', image: '/reflecting-vest-big.jpg' },
            { name: 'Safety Helmet', modelNo: 'Model No: 018', description: 'Safety Helmet', image: '/safety-helmets.jpg' },
            { name: 'Fall Arrest System', modelNo: 'Model No: 019', description: 'Fall Arrest System', image: '/fall-arrest-systems.jpg' },
            { name: 'Chemical Mask', modelNo: 'Model No: 020', description: 'Chemical Mask for Protection', image: '/chemical-mask.jpg' },
            { name: 'Peak Cap', modelNo: 'Model No: 021', description: 'Peak Cap', image: '/p-cap.jpg' },
            { name: 'Security Essential', modelNo: 'Model No: 022', description: 'Security Essential Accessories', image: '/security-essentials.jpg' },
            { name: 'Military Lanyard', modelNo: 'Model No: 023', description: 'Military Lanyard', image: '/lynard.jpg' },
            { name: 'Nylon Belts', modelNo: 'Model No: 024', description: 'Nylon Belts', image: '/security-uniform-belt.jpg' },
            { name: 'Safety Goggles', modelNo: 'Model No: 025', description: 'Safety Goggles', image: '/safety-goggles.jpg' },
            { name: 'Nylon Ropes', modelNo: 'Model No: 026', description: 'Nylon Ropes', image: '/nylon-pp-ropes.jpg' }
          ]
        },
        {
          title: 'Gloves, Badges & Woven Labels',
          items: [
            { name: 'Leather Gloves', modelNo: 'Model No: 027', description: 'Leather Gloves', image: '/safety-gloves-leather.jpg' },
            { name: 'Cotton Gloves', modelNo: 'Model No: 028', description: 'Cotton Gloves', image: '/cotton-gloves-big.jpg' },
            { name: 'Woollen Gloves', modelNo: 'Model No: 029', description: 'Woollen Gloves', image: '/woolen-gloves-big-1.jpg' },
            { name: 'Roping Gloves', modelNo: 'Model No: 030', description: 'Roping Gloves', image: '/roping-gloves.jpg' },
            { name: 'Disposable Gloves', modelNo: 'Model No: 031', description: 'Disposable Gloves', image: '/disposable-surgical-gloves.jpg' },
            { name: 'Heat Resistant Gloves', modelNo: 'Model No: 032', description: 'Heat Resistant Asbestos Gloves', image: '/heat-resistant-gloves.jpg' },
            { name: 'Nitrile Acid Gloves', modelNo: 'Model No: 033', description: 'Nitrile Flocklined Acid Gloves', image: '/nitrile-flocklined-gloves.jpg' },
            { name: 'Badges & Labels Type 1', modelNo: 'Model No: 034A', description: 'Badges & Woven Labels', image: '/securityguard_thumb-badges.jpg' },
            { name: 'Badges & Labels Type 2', modelNo: 'Model No: 034B', description: 'Badges & Woven Labels', image: '/K2_SECURITY.jpg' },
            { name: 'Badges & Labels Type 3', modelNo: 'Model No: 034C', description: 'Badges & Woven Labels', image: '/Run_traks-logo.jpg' }
          ]
        }
      ]
    },
    {
      slug: 'pharmaceutical',
      title: 'Pharmaceutical Industry Uniforms',
      category: 'uniforms',
      summary: 'Hygienic and comfortable uniforms for pharmaceutical industry.',
      mainImage: '/uni-2.jpg',
      features: ['Lint-free fabric', 'Compliant with standards'],
      sections: [
        {
          title: 'Coats',
          items: [
            { name: 'Doctor Coat', modelNo: 'Model No: 035', description: 'Doctor Coat', image: '/doctor_coat.jpg' },
            { name: 'Doctor Coat M/F', modelNo: 'Model No: 036', description: 'Doctor Coat Male & Female', image: '/doctor-coat-lab-coat.jpg' },
            { name: 'Hospital Lab Coat', modelNo: 'Model No: 037', description: 'Hospital Lab Coat', image: '/HOSPITAL-LAB COAT.jpg' },
            { name: 'Lab Coat', modelNo: 'Model No: 038', description: 'Lab Coat', image: '/labcoat.jpg' }
          ]
        },
        {
          title: 'Nurse Uniform',
          items: [
            { name: 'Nurse Uniform 1', modelNo: 'Model No: 039', description: 'Nurse Uniform', image: '/NURSE-UNI.jpg' },
            { name: 'Nurse Uniform 2', modelNo: 'Model No: 040', description: 'Nurse Uniform', image: '/NURSE-UNIFORM-022.jpg' },
            { name: 'Nurse Uniform 3', modelNo: 'Model No: 041', description: 'Nurse Uniform', image: '/NURSE-UNIFORMS-023.jpg' },
            { name: 'Nurse Uniform 4', modelNo: 'Model No: 042', description: 'Nurse Uniform', image: '/nurse_uniform-018.jpg' },
            { name: 'Nurse Uniform 5', modelNo: 'Model No: 043', description: 'Nurse Uniform', image: '/NURSE-UNIF-020.jpg' }
          ]
        },
        {
          title: 'Intern Uniforms & Surgical Gowns',
          items: [
            { name: 'Intern Uniform/Surgical Gown 1', modelNo: 'Model No: 044', description: 'Intern Uniforms / Surgical Gowns', image: '/hospital-uniform-008.jpg' },
            { name: 'Intern Uniform/Surgical Gown 2', modelNo: 'Model No: 045', description: 'Intern Uniforms / Surgical Gowns', image: '/HOSPITAL-UNIFORMS-009.jpg' },
            { name: 'Intern Uniform/Surgical Gown 3', modelNo: 'Model No: 046', description: 'Intern Uniforms / Surgical Gowns', image: '/HOSPITAL-UNIFORMS-010.jpg' },
            { name: 'Intern Uniform Trouser', modelNo: 'Model No: 047', description: 'Intern Uniforms / Trouser', image: '/ladies-bottle-green-uniform-trouser-nurse-vet-beautician-015.jpg' },
            { name: 'Surgical Coat', modelNo: 'Model No: 048', description: 'Intern Uniforms / Surgical Coat', image: '/InternUniform-HOSPITAL-013.png' },
            { name: 'Intern Uniform/Surgical Gown 4', modelNo: 'Model No: 049', description: 'Intern Uniforms / Surgical Gowns', image: '/Medical_Uniforms_&_Scrubs-016.jpg' },
            { name: 'Medical Robe', modelNo: 'Model No: 050', description: 'Robe For Medical Personnel', image: '/Robe-for-Medical-Personnel-024.jpg' },
            { name: 'Medical/Dental Scrubs', modelNo: 'Model No: 051', description: 'Medical / Dental Scrubs', image: '/scrubs-for medical-dental-025.jpg' },
            { name: 'Medical Intern Uniform', modelNo: 'Model No: 052', description: 'Medical Intern Uniform', image: '/medical-intern-uniform.jpg' },
            { name: 'Surgical Gown', modelNo: 'Model No: 053', description: 'Surgical Gown', image: '/Surgical-Gowns.jpg' }
          ]
        },
        {
          title: 'Ward Boy / Lady Uniforms',
          items: [
            { name: 'Ward Boy Uniform Green', modelNo: 'Model No: 054', description: 'Ward Boy Uniform - Green', image: '/HOSPITAL-WARD BOY- DISPOSABLE FEET MASK-011.jpg' },
            { name: 'Ward Boy Uniform Blue', modelNo: 'Model No: 055', description: 'Ward Boy Uniform - Blue', image: '/HOSPITAL-WARD BOY-012.jpg' },
            { name: 'Ward Lady Uniform', modelNo: 'Model No: 056', description: 'Ward Lady Uniform', image: '/NURSE-UNIFORM-021.jpg' }
          ]
        },
        {
          title: 'Accessories',
          items: [
            { name: 'Disposable Foot Mask', modelNo: 'Model No: 057', description: 'Disposable Foot Mask', image: '/DISPOSABLE-FOOT-MASK-001.jpg' },
            { name: 'Disposable Nose Masks', modelNo: 'Model No: 058', description: 'Disposable Nose Masks', image: '/disposable-nose-mask.jpg' },
            { name: 'Re-Usable Face Mask', modelNo: 'Model No: 059', description: 'Re-Usable Face Mask', image: '/face-mask.png' },
            { name: 'Surgical Gloves', modelNo: 'Model No: 060', description: 'Disposable Surgical Gloves', image: '/disposable-surgical-gloves.jpg' },
            { name: 'PVC Apron', modelNo: 'Model No: 061', description: 'PVC Apron', image: '/HOSPITAL-PVC -APRONS-007.jpg' }
          ]
        }
      ]
    },
    {
      slug: 'food',
      title: 'Food Industry Uniforms',
      category: 'uniforms',
      summary: 'Safe and sanitary uniforms for food processing.',
      mainImage: '/uni-3.jpg',
      features: ['Sanitary materials', 'Comfortable fit'],
      sections: [
        {
          title: 'Chef Coats & Chef Uniforms',
          items: [
            { name: 'Chef Coat With Specifications', modelNo: 'Model No: 062', description: 'Chef Coat With Specifications', image: '/chef-reguler-014.jpg' },
            { name: 'Chef Uniform Black Contrast', modelNo: 'Model No: 063', description: 'Chef Uniform Black Contrast', image: '/black-contrast-chef-coat-set-004.jpg' },
            { name: 'Chef Coat Black Contrast', modelNo: 'Model No: 064', description: 'Chef Coat Black Contrast', image: '/Chef-Uniform-016.jpg' },
            { name: 'Chef Coat Plain', modelNo: 'Model No: 065', description: 'Chef Coat Plain', image: '/chef-coat-010.jpg' },
            { name: 'Chef Coat Black Piping', modelNo: 'Model No: 066', description: 'Chef Coat With Black Piping', image: '/chef-coat-012.jpg' },
            { name: 'Chef Coat Blue Contrast', modelNo: 'Model No: 067', description: 'Chef Coat Blue Contrast', image: '/Chef_Coat-007.jpg' },
            { name: 'Chef Coat Black', modelNo: 'Model No: 068', description: 'Chef Coat Black', image: '/chef-black.jpg' },
            { name: 'Chef Coat Ordinary', modelNo: 'Model No: 069', description: 'Chef Coat Ordinary', image: '/chef uniform-005.jpg' },
            { name: 'Chef Uniform M/F 1', modelNo: 'Model No: 070', description: 'Chef Uniforms Male & Female', image: '/chef-coat-male -female-013.jpg' },
            { name: 'Chef Uniform M/F 2', modelNo: 'Model No: 071', description: 'Chef Uniforms Male & Female', image: '/chef-uniform-015.jpg' }
          ]
        },
        {
          title: 'Aprons & Chef Caps',
          items: [
            { name: 'Apron Men Stripes', modelNo: 'Model No: 072', description: 'Apron For Men With Stripes', image: '/adult-apron-butchers-stripe-001.jpg' },
            { name: 'Apron Men Plain', modelNo: 'Model No: 073', description: 'Apron For Men Plain', image: '/APRONS-002.jpg' },
            { name: 'Apron Women Stripes', modelNo: 'Model No: 074', description: 'Apron For Women With Stripes', image: '/ladies-apron.jpg' },
            { name: 'Half Apron Unisex', modelNo: 'Model No: 075', description: 'Half Apron Unisex', image: '/HALF-APRON-022.jpg' },
            { name: 'Dish Washing Apron Men', modelNo: 'Model No: 076', description: 'Dish Washing Apron For Men', image: '/dish-washer-apron.jpg' },
            { name: 'Dish Washing Apron Women', modelNo: 'Model No: 077', description: 'Dish Washing Apron For Women', image: '/dish-washer-apron-ladies.jpg' },
            { name: 'Chef Cap White', modelNo: 'Model No: 078', description: 'Chef Cap White', image: '/chef-cap.jpg' },
            { name: 'Chef Cap Contrast', modelNo: 'Model No: 079', description: 'Chef Cap Black & White Contrast', image: '/chef-cap-029.jpg' },
            { name: 'Chef Cap Patterns', modelNo: 'Model No: 080', description: 'Chef Caps - Black Striped & Checked', image: '/chef-caps.jpg' },
            { name: 'Chef Cap Non Woven', modelNo: 'Model No: 081', description: 'Chef Cap Non Woven', image: '/Non-Woven-Chef-Cap.jpg' }
          ]
        },
        {
          title: 'Front Office / Front Desk Uniforms',
          items: [
            { name: 'Vest Coat V-Neck', modelNo: 'Model No: 082', description: 'Front Office Vest Coats - V-Neck', image: '/basic-v-neck-vest-coats.jpg' },
            { name: 'Vest Coat With Tie', modelNo: 'Model No: 083', description: 'Front Office Vest Coat - With Tie', image: '/front_office-017.jpg' },
            { name: 'Vest Coat Without Tie', modelNo: 'Model No: 084', description: 'Front Office Vest Coat - Without Tie', image: '/front_office-018.jpg' },
            { name: 'Vest Coat Back', modelNo: 'Model No: 085', description: 'Front Office Vest Coat - Back', image: '/front_office-back-019.jpg' },
            { name: 'Black Trouser Coat & Bow', modelNo: 'Model No: 086', description: 'Black Trouser Coat & Bow', image: '/black-trouser-coat-bow.jpg' },
            { name: 'Captain Coats', modelNo: 'Model No: 087', description: 'Captain Coats Men & Women', image: '/captain-coats.jpg' },
            { name: 'Front Office M/F 1', modelNo: 'Model No: 088', description: 'Front Office Men & Women', image: '/front-office-uniform-020.jpg' },
            { name: 'Front Office M/F 2', modelNo: 'Model No: 089', description: 'Front Office Men & Women', image: '/front-off.jpg' },
            { name: 'Front Office Ladies', modelNo: 'Model No: 090', description: 'Front Office Ladies Uniforms', image: '/front-office-ladies-staff-uniforms.jpg' },
            { name: 'Front Desk Ladies', modelNo: 'Model No: 091', description: 'Front Desk Ladies Uniform', image: '/front-desk.jpg' }
          ]
        },
        {
          title: 'Waiter / House-Keeping / Room Service Uniforms',
          items: [
            { name: 'Waiter Uniform M/F', modelNo: 'Model No: 092', description: 'Waiter Uniform Men & Women', image: '/waiter-uniform-027.jpg' },
            { name: 'Waiter Blazer Bow', modelNo: 'Model No: 093', description: 'Waiter Uniform Blazer With Bow', image: '/waiter-uniform-029.jpg' },
            { name: 'T-Shirt Piping', modelNo: 'Model No: 094', description: 'T-Shirts - For Waiters With Piping', image: '/polo-t shirts-waiter.jpg' },
            { name: 'T-Shirt No Piping', modelNo: 'Model No: 095', description: 'T-Shirts - For Waiters Without Piping', image: '/t-shirts-men & women.jpg' },
            { name: 'T-Shirt Various Colors', modelNo: 'Model No: 096', description: 'T-Shirts - For Waiters Various Colours', image: '/T- Shirt-waiter -colours.jpg' },
            { name: 'Bell Boy Uniform', modelNo: 'Model No: 097', description: 'Bell Boy Uniform', image: '/bell-boy-uniform-003.jpg' },
            { name: 'Butler Uniform', modelNo: 'Model No: 098', description: 'Butler Uniform', image: '/butler-uniforms-030.jpg' },
            { name: 'House Keeping Men', modelNo: 'Model No: 099', description: 'House Keeping Uniform - Men', image: '/housekeeping-uniform-023.jpg' },
            { name: 'House Keeping Women', modelNo: 'Model No: 100', description: 'House Keeping Uniform - Women', image: '/housekeeping-utility-uniform.jpg' },
            { name: 'Room Service Uniform', modelNo: 'Model No: 101', description: 'Room Service Uniform', image: '/room-service.jpg' }
          ]
        }
      ]
    },
    {
      slug: 'government',
      title: 'Government Sector Uniforms',
      category: 'uniforms',
      summary: 'Professional uniforms for government departments and agencies.',
      mainImage: '/uni-4.jpg',
      features: ['Durable', 'Accurate design'],
      sections: [
        {
          title: 'Police Uniform & Thier Accessories',
          items: [
            { name: 'Police Uniform', modelNo: 'Model No: 102', description: 'Police Uniform', image: '/police.jpg' },
            { name: 'Police Essentials', modelNo: 'Model No: 103', description: 'Police Essentials', image: '/police-uniform-essentials.jpg' },
            { name: 'Navy Officer Admiral Cap', modelNo: 'Model No: 104', description: 'Navy Officer Admiral - Cap', image: '/big-u-navy-officer-admiral-khaki-hat-1.jpg' },
            { name: 'Police Cap IPS', modelNo: 'Model No: 105', description: 'Police Cap - IPS', image: '/ips-cap.jpg' },
            { name: 'Police Cap All Cadres', modelNo: 'Model No: 106', description: 'Police Cap For All Cadres', image: '/police-caps-all types.jpg' },
            { name: 'Beret Cap Front', modelNo: 'Model No: 107-A', description: 'Beret Cap - Front', image: '/beret cap.jpg' },
            { name: 'Beret Cap Back', modelNo: 'Model No: 107-B', description: 'Beret Cap - Back', image: '/beret-cap-back.jpg' },
            { name: 'Beret Cap Khakhi', modelNo: 'Model No: 108', description: 'Beret Cap - Khakhi', image: '/beret-cap-khaki.jpg' },
            { name: 'Police Belt 1', modelNo: 'Model No: 109', description: 'Police Belt', image: '/belt-buckle.jpg' },
            { name: 'Police Belt 2', modelNo: 'Model No: 110', description: 'Police Belt', image: '/police-belt.jpg' },
            { name: 'Police Belt Buckle', modelNo: 'Model No: 111', description: 'Police Belt Buckle', image: '/police-buckle.jpg' },
            { name: 'Belt With Pistol Pouch', modelNo: 'Model No: 112', description: 'Police Belt With Pistol Pouch', image: '/police-belt-with bullet pouch.jpg' },
            { name: 'Shoulder Flap With Stars', modelNo: 'Model No: 113', description: 'Shoulder Flap With Stars', image: '/shoulder flap-with stars.jpg' },
            { name: 'Collar Devices Stars', modelNo: 'Model No: 114', description: 'Collar Devices Stars', image: '/vice-admiral-lt-general-collar-devices.jpg' },
            { name: 'Collar Devices Ribbon', modelNo: 'Model No: 118', description: 'Collar Devices Metal Ribbon', image: '/ribbon-mount-7-ribbons.jpg' },
            { name: 'Police Buttons Steel', modelNo: 'Model No: 119', description: 'Police Buttons Police Imprinted - Steel', image: '/police-button-steel.jpg' },
            { name: 'P Buttons Steel', modelNo: 'Model No: 120', description: 'Police Buttons P Imprinted - Steel', image: '/p-steel-button.jpg' },
            { name: 'Buttons Brass', modelNo: 'Model No: 121', description: 'Police Buttons Brass', image: '/police buttons.jpg' },
            { name: 'Defence Service Ribbon', modelNo: 'Model No: 122', description: 'National Defence Service Ribbon', image: '/national-defense-service-ribbon.jpg' },
            { name: 'Silver Star Ribbon', modelNo: 'Model No: 123', description: 'Silver Star Service Ribbon', image: '/silver-star-ribbon.jpg' }
          ]
        }
      ]
    },
    {
      slug: 'school-uniform',
      title: 'Schools / Colleges Uniforms',
      category: 'uniforms',
      summary: 'Smart, comfortable and durable uniforms for educational institutions.',
      mainImage: '/uni-5.jpg',
      features: ['Durable', 'Comfortable'],
      sections: [
        {
          title: 'School / College Uniforms',
          items: [
            { name: 'School Uniform All Class', modelNo: 'Model No: 124', description: 'School Uniform - Boys & Girls All Class Range', image: '/school-uniform-for all class-range-boys & girls.jpg' },
            { name: 'High School With Blazers', modelNo: 'Model No: 125', description: 'High School Uniform With Blazers & School Logo Imprinted', image: '/high-school-uniform.jpg' },
            { name: 'Various Patterns', modelNo: 'Model No: 126', description: 'School Uniform - Boys & Girls Various Patterns', image: '/school-uniforms.jpg' },
            { name: 'Lower Classes', modelNo: 'Model No: 127', description: 'School Uniform - Boys & Girls For Lower Classes', image: '/lower-classes.jpg' },
            { name: 'Full Pant Full Sleeves', modelNo: 'Model No: 128', description: 'School Uniform Full Pant - Full Sleeves', image: '/School-Uniform - full-pant-full sleeves.jpg' },
            { name: 'Full Pant Half Sleeves', modelNo: 'Model No: 129', description: 'School Uniform Full Pant - Half Sleeves', image: '/full-pant-half-sleeves.jpg' },
            { name: 'Shirts With Logo', modelNo: 'Model No: 130', description: 'School Uniform Shirts - With Logo', image: '/school.jpg' },
            { name: 'Girls Pinnafore Kindergarten', modelNo: 'Model No: 131', description: 'Girls Pinnafore Kindergarten', image: '/girls_school_uniform_jumper.jpg' },
            { name: 'Girls Pinnafore Lower', modelNo: 'Model No: 132', description: 'Girls Pinnafore Lower Classes', image: '/girls-uniform-school.jpg' },
            { name: 'Pinnafore Full Sleeves', modelNo: 'Model No: 133', description: 'Girls Pinnafore With Collar & Full Sleeves', image: '/girls-uniform-school.jpg' },
            { name: 'High School Jacket Girls', modelNo: 'Model No: 134', description: 'High School Uniform With Jacket - Girls', image: '/school-uniform-with-jacket-girls.jpg' },
            { name: 'High School OverCoat Girls', modelNo: 'Model No: 135', description: 'High School Uniform With OverCoat - Girls', image: '/senior-girls-uniform-with-overcoat.jpg' },
            { name: 'High School Dupatta Girls', modelNo: 'Model No: 136', description: 'High School Uniform With Dupatta - Girls', image: '/salwar-kameez-school-uniform-with dupatta.jpg' },
            { name: 'Workshop Uniform 1', modelNo: 'Model No: 137', description: 'Workshop Uniform For Diploma Students', image: '/workshop.jpg' },
            { name: 'Workshop Uniform 2', modelNo: 'Model No: 138', description: 'Workshop Uniform For Diploma Students', image: '/workshop-uniform.jpg' },
            { name: 'College Uniform M/F 1', modelNo: 'Model No: 139', description: 'College Uniform Male & Female', image: '/college-uniform-male & femal.jpg' },
            { name: 'College Uniform M/F 2', modelNo: 'Model No: 140', description: 'College Uniform Male & Female', image: '/college-uniforms.jpg' },
            { name: 'College Blazers', modelNo: 'Model No: 141', description: 'College Uniform Blazers', image: '/college-uniforms-.jpg' },
            { name: 'Business Uniform Sales', modelNo: 'Model No: 142', description: 'Business Uniform For Sales Persons', image: '/Business-Uniform.jpg' }
          ]
        },
        {
          title: 'School / College Sports Uniforms',
          items: [
            { name: 'Sports Full Pants', modelNo: 'Model No: 143', description: 'Sports Uniform Full Pants', image: '/fullpant-sports.jpg' },
            { name: 'Sports Half Pants', modelNo: 'Model No: 144', description: 'Sports Uniform Half Pants', image: '/school-sports-uniform.jpg' },
            { name: 'Sports Polo T-Shirts', modelNo: 'Model No: 145', description: 'Sports Uniform Polo Neck T-Shirts', image: '/Polo-Neck-T-Shirts-.jpg' },
            { name: 'Sports T-Shirts', modelNo: 'Model No: 146', description: 'Sports T-Shirts Various Types', image: '/t-shirts.jpg' },
            { name: 'Track Suits', modelNo: 'Model No: 147', description: 'Sports Essentials Track Suits', image: '/track-suit-sports.jpg' },
            { name: 'March Past Boys & Girls', modelNo: 'Model No: 148', description: 'March Past Uniform For Boys & Girls', image: '/March-past-uniform.jpg' },
            { name: 'March Past Jackets Girls', modelNo: 'Model No: 149', description: 'March Past Uniform For Girls With Jackets & Beret Caps', image: '/sports-uni-for-girls.jpg' },
            { name: 'Sports Skirt Blouse Girls', modelNo: 'Model No: 150', description: 'Sports Uniform Skirt & Blouse For Girls', image: '/sports-uni-girls.jpg' },
            { name: 'NCC Uniform', modelNo: 'Model No: 151', description: 'NCC Uniform With Ceremonial Accessories', image: '/NCC-essentials.jpg' }
          ]
        },
        {
          title: 'School / College Uniform Accessories',
          items: [
            { name: 'Caps With Logo', modelNo: 'Model No: 152-A', description: 'Caps With Logo Front & Back', image: '/caps-fron-back.jpg' },
            { name: 'Caps More Types', modelNo: 'Model No: 152-B', description: 'Caps With Logo More...', image: '/Caps.jpg' },
            { name: 'Cabbie Flat Caps', modelNo: 'Model No: 153', description: 'Cabbie Flat Caps', image: '/Cabbie-Flat-cap.jpg' },
            { name: 'School Belts Plain', modelNo: 'Model No: 154', description: 'School Belts Plain', image: '/school belts.jpg' },
            { name: 'School Belts Printed', modelNo: 'Model No: 155', description: 'School Belts With School Name Printed', image: '/school-belts-with school name -imprinted.jpg' },
            { name: 'Belt Buckles Logo', modelNo: 'Model No: 156', description: 'Belts Buckles With School Name & Logo', image: '/School-Belts-buckles.jpg' },
            { name: 'College Belts', modelNo: 'Model No: 157', description: 'College Belts Black & Brown', image: '/leather belt-for colleges- brwn.jfif' },
            { name: 'Identity Cards', modelNo: 'Model No: 158', description: 'School /College Identity Cards', image: '/ID-cards.png' },
            { name: 'ID Card Tag', modelNo: 'Model No: 159', description: 'ID Card Tag With School / College Name', image: '/ID-CARDS-tAG.jpg' },
            { name: 'Ties Striped', modelNo: 'Model No: 160', description: 'Ties Striped', image: '/school-tie-250x250.jpg' },
            { name: 'Ties Various Patterns', modelNo: 'Model No: 161', description: 'Ties Various Patterns', image: '/ties.jpg' },
            { name: 'Nylon Socks Black', modelNo: 'Model No: 162', description: 'Socks Nylon - Black', image: '/nylon-socks-black.jpg' },
            { name: 'Nylon Socks White', modelNo: 'Model No: 163', description: 'Socks Nylon - White', image: '/nylon-socks-white.jpg' },
            { name: 'Nylon Socks Colors', modelNo: 'Model No: 164', description: 'Nylon Socks Black - White - Blue', image: '/nylon-blue-black-white.jpg' },
            { name: 'Cotton Socks Black', modelNo: 'Model No: 165', description: 'Socks Cotton - Black', image: '/cotton-black.jpg' },
            { name: 'Cotton Socks White', modelNo: 'Model No: 166', description: 'Socks Cotton - White', image: '/cotton-white.jpg' },
            { name: 'Cotton Socks Grey', modelNo: 'Model No: 167', description: 'Socks Cotton - Grey', image: '/cotton-grey.jpg' },
            { name: 'Cotton Socks All Colors 1', modelNo: 'Model No: 168', description: 'Cotton Socks All Colours', image: '/cotton-socks-all colours.jpg' },
            { name: 'Cotton Socks All Colors 2', modelNo: 'Model No: 169', description: 'Cotton Socks All Colours More...', image: '/cotton-for colleges.jpg' },
            { name: 'Cotton Socks Knee Length', modelNo: 'Model No: 170', description: 'Cotton Socks Knee - Length', image: '/knee-length-school-socks-cotton.jpg' }
          ]
        }
      ]
    },
    {
      slug: 'industrial-shoes',
      title: 'Industrial Shoes',
      category: 'shoes',
      summary: 'Heavy-duty footwear for industrial environments.',
      mainImage: '/sh-1.jpg',
      features: [
        'Steel toe',
        'Anti-slip soles'
      ],
      sections: []
    },
    {
      slug: 'safety-shoes',
      title: 'Safety & Security Shoe',
      category: 'shoes',
      summary: 'Premium safety shoes with steel toe and slip-resistant soles.',
      mainImage: '/sh-2.png',
      features: ['IS 15298 certified', 'ESD properties'],
      sections: []
    },
    {
      slug: 'uniform-shoes',
      title: 'Uniform Shoe',
      category: 'shoes',
      summary: 'Professional uniform shoes for corporate and institutional use.',
      mainImage: '/sh-3.png',
      features: ['Comfortable fit', 'Professional look'],
      sections: []
    },
    {
      slug: 'executive-shoes',
      title: 'Executive Shoe',
      category: 'shoes',
      summary: 'Elegant formal leather shoes for executives.',
      mainImage: '/sh-4.png',
      features: ['Premium leather', 'All-day comfort'],
      sections: []
    },
    {
      slug: 'school-shoes',
      title: 'Schools / Colleges Shoe',
      category: 'shoes',
      summary: 'Comfortable and durable shoes for students of all ages.',
      mainImage: '/sh-5.jpg',
      features: ['Durable construction', 'Anti-skid soles'],
      sections: []
    }
  ];

  for (const p of products) {
    await upsertProduct(p);
  }

  // eslint-disable-next-line no-console
  console.log('Seeded sample products');
  process.exit(0);
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
