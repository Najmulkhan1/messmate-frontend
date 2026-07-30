export const DIVISIONS = [
  "Barishal", "Chattogram", "Dhaka", "Khulna",
  "Mymensingh", "Rajshahi", "Rangpur", "Sylhet",
] as const;

export const DISTRICTS: Record<string, string[]> = {
  Barishal: ["Barguna", "Barishal", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur"],
  Chattogram: ["Bandarban", "Brahmanbaria", "Chandpur", "Chattogram", "Comilla", "Cox's Bazar", "Feni", "Khagrachhari", "Lakshmipur", "Noakhali", "Rangamati"],
  Dhaka: ["Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Kishoreganj", "Madaripur", "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Rajbari", "Shariatpur", "Tangail"],
  Khulna: ["Bagerhat", "Chuadanga", "Jashore", "Jhenaidah", "Khulna", "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira"],
  Mymensingh: ["Jamalpur", "Mymensingh", "Netrokona", "Sherpur"],
  Rajshahi: ["Bogura", "Chapainawabganj", "Joypurhat", "Naogaon", "Natore", "Pabna", "Rajshahi", "Sirajganj"],
  Rangpur: ["Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Rangpur", "Thakurgaon"],
  Sylhet: ["Habiganj", "Moulvibazar", "Sunamganj", "Sylhet"],
};

export const UPAZILAS: Record<string, string[]> = {
  // === Dhaka Division ===
  "Dhaka": ["Adabar", "Badda", "Bangshal", "Cantonment", "Chawkbazar", "Dakshinkhan", "Dhamrai", "Dhanmondi", "Dohar", "Gendaria", "Gulshan", "Hazaribagh", "Jatrabari", "Kafrul", "Kalabagan", "Kamrangirchar", "Keraniganj", "Khilgaon", "Khilkhet", "Lalbagh", "Mirpur", "Mohammadpur", "Motijheel", "Nawabganj", "New Market", "Pallabi", "Paltan", "Ramna", "Rampura", "Sabujbagh", "Savar", "Shah Ali", "Shahbagh", "Sher-e-Bangla Nagar", "Shyampur", "Sutrapur", "Tejgaon", "Turag", "Uttara"],
  "Faridpur": ["Alfadanga", "Bhanga", "Boalmari", "Charbhadrasan", "Faridpur Sadar", "Madhukhali", "Nagarkanda", "Sadarpur", "Saltha"],
  "Gazipur": ["Gazipur Sadar", "Kaliakair", "Kaliganj", "Kapasia", "Sreepur", "Tongi"],
  "Gopalganj": ["Gopalganj Sadar", "Kashiani", "Kotalipara", "Muksudpur", "Tungipara"],
  "Kishoreganj": ["Austagram", "Bajitpur", "Bhairab", "Hossainpur", "Itna", "Karimganj", "Katiadi", "Kishoreganj Sadar", "Kuliarchar", "Mithamain", "Nikli", "Pakundia", "Tarail"],
  "Madaripur": ["Dasar", "Kalkini", "Madaripur Sadar", "Rajoir", "Shibchar"],
  "Manikganj": ["Daulatpur", "Ghior", "Harirampur", "Manikganj Sadar", "Saturia", "Shivalaya", "Singair"],
  "Munshiganj": ["Gazaria", "Lohajang", "Munshiganj Sadar", "Sirajdikhan", "Sreenagar", "Tongibari"],
  "Narayanganj": ["Araihazar", "Bandar", "Narayanganj Sadar", "Rupganj", "Sonargaon"],
  "Narsingdi": ["Belabo", "Monohardi", "Narsingdi Sadar", "Palash", "Raipura", "Shibpur"],
  "Rajbari": ["Baliakandi", "Goalandaghat", "Kalukhali", "Pangsha", "Rajbari Sadar"],
  "Shariatpur": ["Bhedarganj", "Damudya", "Gosairhat", "Naria", "Shariatpur Sadar", "Zajira"],
  "Tangail": ["Basail", "Bhuapur", "Delduar", "Dhanbari", "Ghatail", "Gopalpur", "Kalihati", "Khandaghosh", "Madhupur", "Mirzapur", "Nagarpur", "Sakhipur", "Tangail Sadar"],

  // === Chattogram Division ===
  "Bandarban": ["Ali Kadam", "Bandarban Sadar", "Lama", "Naikhongchhari", "Rowangchhari", "Ruma", "Thanchi"],
  "Brahmanbaria": ["Akhaura", "Ashuganj", "Bancharampur", "Bijoynagar", "Brahmanbaria Sadar", "Kasba", "Nabinagar", "Nasirnagar", "Sarail"],
  "Chandpur": ["Chandpur Sadar", "Faridganj", "Haimchar", "Haziganj", "Kachua", "Matlab Dakshin", "Matlab Uttar", "Shahrasti"],
  "Chattogram": ["Akbarshah", "Anwara", "Bakalia", "Bandar", "Banshkhali", "Bayejid Bostami", "Bhatiary", "Boalkhali", "Chandanaish", "Chandgaon", "Double Mooring", "EPZ", "Fatikchhari", "Halishahar", "Hathazari", "Karnaphuli", "Khulshi", "Kotwali", "Lohagara", "Mirsharai", "Pahartali", "Panchlaish", "Patenga", "Patiya", "Rangunia", "Raozan", "Sandwip", "Satkania", "Sitakunda"],
  "Comilla": ["Barura", "Brahmanpara", "Burichang", "Chandina", "Chauddagram", "Comilla Adarsha Sadar", "Comilla Sadar Dakshin", "Daudkandi", "Debidwar", "Homna", "Laksam", "Lalmai", "Meghna", "Monohorgonj", "Muradnagar", "Nangalkot", "Titas"],
  "Cox's Bazar": ["Chakaria", "Cox's Bazar Sadar", "Kutubdia", "Maheshkhali", "Pekua", "Ramu", "Teknaf", "Ukhia"],
  "Feni": ["Chhagalnaiya", "Daganbhuiyan", "Feni Sadar", "Fulgazi", "Parshuram", "Sonagazi"],
  "Khagrachhari": ["Dighinala", "Guimara", "Khagrachhari Sadar", "Lakshmichhari", "Mahalchhari", "Manikchhari", "Matiranga", "Panchhari", "Ramgarh"],
  "Lakshmipur": ["Kamalnagar", "Lakshmipur Sadar", "Raipur", "Ramganj", "Ramgati"],
  "Noakhali": ["Begumganj", "Chatkhil", "Companiganj", "Hatiya", "Kabirhat", "Noakhali Sadar", "Senbagh", "Sonaimuri", "Subarnachar"],
  "Rangamati": ["Bagaichhari", "Barkal", "Belaichhari", "Juraichhari", "Kaptai", "Kawkhali", "Langadu", "Naniarchar", "Rajasthali", "Rangamati Sadar"],

  // === Khulna Division ===
  "Bagerhat": ["Bagerhat Sadar", "Chitalmari", "Fakirhat", "Kachua", "Mollahat", "Mongla", "Morrelganj", "Rampal", "Sarankhola"],
  "Chuadanga": ["Alamdanga", "Chuadanga Sadar", "Damurhuda", "Jibannagar"],
  "Jashore": ["Abhaynagar", "Bagherpara", "Chaugachha", "Jashore Sadar", "Jhikargachha", "Keshabpur", "Manirampur", "Sharsha"],
  "Jhenaidah": ["Harinakunda", "Jhenaidah Sadar", "Kaliganj", "Kotchandpur", "Maheshpur", "Shailkupa"],
  "Khulna": ["Batiaghata", "Dacope", "Daulatpur", "Dighalia", "Dumuria", "Khalishpur", "Khan Jahan Ali", "Kotwali", "Koyra", "Paikgacha", "Phultala", "Rupsha", "Sonadanga", "Terokhada"],
  "Kushtia": ["Bheramara", "Daulatpur", "Khoksa", "Kumarkhali", "Kushtia Sadar", "Mirpur"],
  "Magura": ["Magura Sadar", "Mohammadpur", "Shalikha", "Sreepur"],
  "Meherpur": ["Gangni", "Meherpur Sadar", "Mujibnagar"],
  "Narail": ["Kalia", "Lohagara", "Narail Sadar"],
  "Satkhira": ["Assasuni", "Debhata", "Kalaroa", "Kaliganj", "Satkhira Sadar", "Shyamnagar", "Tala"],

  // === Rajshahi Division ===
  "Bogura": ["Adamdighi", "Bogura Sadar", "Dhunat", "Dhupchanchia", "Gabtali", "Kahaloo", "Nandigram", "Sariakandi", "Shajahanpur", "Sherpur", "Shibganj", "Sonatala"],
  "Chapainawabganj": ["Bholahat", "Chapainawabganj Sadar", "Gomastapur", "Nachole", "Shibganj"],
  "Joypurhat": ["Akkelpur", "Joypurhat Sadar", "Kalai", "Khetlal", "Panchbibi"],
  "Naogaon": ["Atrai", "Badalgachhi", "Dhamoirhat", "Manda", "Mohadevpur", "Naogaon Sadar", "Niamatpur", "Patnitala", "Porsha", "Raninagar", "Sapahar"],
  "Natore": ["Baraigram", "Gurudaspur", "Lalpur", "Naldanga", "Natore Sadar", "Singra"],
  "Pabna": ["Atgharia", "Bera", "Bhangura", "Chatmohar", "Faridpur", "Ishwardi", "Pabna Sadar", "Santhia", "Sujanagar"],
  "Rajshahi": ["Bagha", "Bagmara", "Boalia", "Charghat", "Durgapur", "Godagari", "Matihar", "Mohanpur", "Paba", "Puthia", "Rajpara", "Shah Makhdum", "Tanore"],
  "Sirajganj": ["Belkuchi", "Chauhali", "Kamarkhanda", "Kazipur", "Raiganj", "Shahjadpur", "Sirajganj Sadar", "Tarash", "Ullahpara"],

  // === Mymensingh Division ===
  "Jamalpur": ["Baksiganj", "Dewanganj", "Islampur", "Jamalpur Sadar", "Madarganj", "Melandaha", "Sarishabari"],
  "Mymensingh": ["Bhaluka", "Dhobaura", "Fulbaria", "Gaffargaon", "Gauripur", "Haluaghat", "Ishwarganj", "Kotwali", "Muktagachha", "Nandail", "Phulpur", "Tarakanda", "Trishal"],
  "Netrokona": ["Atpara", "Barhatta", "Durgapur", "Khaliajuri", "Kalmakanda", "Kendua", "Madan", "Mohanganj", "Netrokona Sadar", "Purbadhala"],
  "Sherpur": ["Jhenaigati", "Nakla", "Nalitabari", "Sherpur Sadar", "Sreebardi"],

  // === Rangpur Division ===
  "Dinajpur": ["Biral", "Birampur", "Birganj", "Bochaganj", "Chirirbandar", "Dinajpur Sadar", "Ghoraghat", "Hakimpur", "Kaharole", "Khansama", "Nawabganj", "Parbatipur"],
  "Gaibandha": ["Fulchhari", "Gaibandha Sadar", "Gobindaganj", "Palashbari", "Sadullapur", "Saghata", "Sundarganj"],
  "Kurigram": ["Bhurungamari", "Char Rajibpur", "Chilmari", "Kurigram Sadar", "Nageshwari", "Phulbari", "Rajarhat", "Raomari", "Ulipur"],
  "Lalmonirhat": ["Aditmari", "Hatibandha", "Kaliganj", "Lalmonirhat Sadar", "Patgram"],
  "Nilphamari": ["Dimla", "Domar", "Jaldhaka", "Kishoreganj", "Nilphamari Sadar", "Saidpur"],
  "Panchagarh": ["Atwari", "Boda", "Debiganj", "Panchagarh Sadar", "Tetulia"],
  "Rangpur": ["Badarganj", "Gangachara", "Kaunia", "Mithapukur", "Pirgachha", "Pirganj", "Rangpur Sadar", "Taraganj"],
  "Thakurgaon": ["Baliadangi", "Haripur", "Pirganj", "Ranisankail", "Thakurgaon Sadar"],

  // === Barishal Division ===
  "Barguna": ["Amtali", "Bamna", "Barguna Sadar", "Betagi", "Patharghata", "Taltali"],
  "Barishal": ["Agailjhara", "Babuganj", "Bakerganj", "Banaripara", "Barishal Sadar", "Gournadi", "Hizla", "Mehendiganj", "Muladi", "Wazirpur"],
  "Bhola": ["Bhola Sadar", "Burhanuddin", "Char Fasson", "Daulatkhan", "Lalmohan", "Manpura", "Tazumuddin"],
  "Jhalokati": ["Jhalokati Sadar", "Kanthalia", "Nalchity", "Rajapur"],
  "Patuakhali": ["Bauphal", "Dashmina", "Dumki", "Galachipa", "Kalapara", "Mirzaganj", "Patuakhali Sadar", "Rangabali"],
  "Pirojpur": ["Bhandaria", "Indurkani", "Kawkhali", "Mathbaria", "Nazirpur", "Nesarabad", "Pirojpur Sadar"],

  // === Sylhet Division ===
  "Habiganj": ["Ajmiriganj", "Bahubal", "Baniyachong", "Chunarughat", "Habiganj Sadar", "Lakhai", "Madhabpur", "Nabiganj", "Shayestaganj"],
  "Moulvibazar": ["Barlekha", "Juri", "Kamalganj", "Kulaura", "Moulvibazar Sadar", "Rajnagar", "Sreemangal"],
  "Sunamganj": ["Bishwamvarpur", "Chhatak", "Dakshin Sunamganj", "Derai", "Dharamapasha", "Dowarabazar", "Jagannathpur", "Jamalganj", "Sulla", "Sunamganj Sadar", "Tahirpur"],
  "Sylhet": ["Balaganj", "Beanibazar", "Bishwanath", "Companiganj", "Dakshin Surma", "Fenchuganj", "Golapganj", "Gowainghat", "Jaintiapur", "Kanaighat", "Kotwali", "Osmani Nagar", "Sylhet Sadar", "Zakiganj"],
};

export function getDistricts(division: string): string[] {
  return DISTRICTS[division] || [];
}

export function getUpazilas(district: string): string[] {
  return UPAZILAS[district] || [];
}