import Database from 'better-sqlite3'
import path from 'path'

const dbPath = path.join(process.cwd(), 'bookings.db')
const db = new Database(dbPath)

// Enable WAL mode for better concurrent access
db.pragma('journal_mode = WAL')

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    alternate_phone TEXT,
    service_type TEXT NOT NULL,
    service_slug TEXT NOT NULL,
    service_name TEXT NOT NULL,
    package_type TEXT NOT NULL,
    package_price TEXT NOT NULL,
    decorations TEXT,
    deco_prices TEXT,
    muhurta TEXT,
    preferred_date TEXT NOT NULL,
    preferred_time TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    notes TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    title_en TEXT NOT NULL,
    title_mr TEXT NOT NULL,
    title_hi TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_mr TEXT NOT NULL,
    description_hi TEXT NOT NULL,
    short_en TEXT NOT NULL,
    short_mr TEXT NOT NULL,
    short_hi TEXT NOT NULL,
    image TEXT NOT NULL,
    duration TEXT NOT NULL,
    basic_price TEXT NOT NULL,
    basic_includes_en TEXT NOT NULL,
    basic_includes_mr TEXT NOT NULL,
    basic_includes_hi TEXT NOT NULL,
    standard_price TEXT NOT NULL,
    standard_includes_en TEXT NOT NULL,
    standard_includes_mr TEXT NOT NULL,
    standard_includes_hi TEXT NOT NULL,
    premium_price TEXT NOT NULL,
    premium_includes_en TEXT NOT NULL,
    premium_includes_mr TEXT NOT NULL,
    premium_includes_hi TEXT NOT NULL,
    sahitya_en TEXT NOT NULL,
    sahitya_mr TEXT NOT NULL,
    sahitya_hi TEXT NOT NULL,
    muhurta TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS hero_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    desktop_image TEXT NOT NULL,
    mobile_image TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS decorations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    service_id INTEGER NOT NULL,
    name_en TEXT NOT NULL,
    name_mr TEXT NOT NULL,
    name_hi TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_mr TEXT NOT NULL,
    description_hi TEXT NOT NULL,
    price TEXT NOT NULL,
    photos TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
  CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(preferred_date);
  CREATE INDEX IF NOT EXISTS idx_bookings_service ON bookings(service_slug);
  CREATE INDEX IF NOT EXISTS idx_bookings_user ON bookings(user_id);
  CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
  CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
  CREATE INDEX IF NOT EXISTS idx_decorations_service ON decorations(service_id);
`)

export interface User {
  id?: number
  name: string
  email: string
  phone: string
  password: string
  created_at?: string
}

export interface Booking {
  id?: number
  user_id?: number
  name: string
  email: string
  phone: string
  alternate_phone?: string
  service_type: string
  service_slug: string
  service_name: string
  package_type: string
  package_price: string
  decorations?: string
  deco_prices?: string
  muhurta?: string
  preferred_date: string
  preferred_time: string
  address: string
  city: string
  notes?: string
  status?: string
  created_at?: string
  updated_at?: string
}

export interface Service {
  id?: number
  slug: string
  category: string
  title_en: string
  title_mr: string
  title_hi: string
  description_en: string
  description_mr: string
  description_hi: string
  short_en: string
  short_mr: string
  short_hi: string
  image: string
  duration: string
  basic_price: string
  basic_includes_en: string
  basic_includes_mr: string
  basic_includes_hi: string
  standard_price: string
  standard_includes_en: string
  standard_includes_mr: string
  standard_includes_hi: string
  premium_price: string
  premium_includes_en: string
  premium_includes_mr: string
  premium_includes_hi: string
  sahitya_en: string
  sahitya_mr: string
  sahitya_hi: string
  muhurta?: string
  created_at?: string
  updated_at?: string
}

export interface HeroImages {
  id?: number
  desktop_image: string
  mobile_image: string
  created_at?: string
  updated_at?: string
}

export interface Decoration {
  id?: number
  service_id: number
  name_en: string
  name_mr: string
  name_hi: string
  description_en: string
  description_mr: string
  description_hi: string
  price: string
  photos: string
  created_at?: string
  updated_at?: string
}

// User functions
export function createUser(user: User): User {
  const stmt = db.prepare(`
    INSERT INTO users (name, email, phone, password)
    VALUES (?, ?, ?, ?)
  `)
  
  const result = stmt.run(
    user.name,
    user.email,
    user.phone,
    user.password
  )
  
  return { ...user, id: result.lastInsertRowid as number }
}

export function getUserByEmail(email: string): User | undefined {
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?')
  return stmt.get(email) as User | undefined
}

export function getUserById(id: number): User | undefined {
  const stmt = db.prepare('SELECT * FROM users WHERE id = ?')
  return stmt.get(id) as User | undefined
}

export function verifyUser(email: string, password: string): User | undefined {
  const stmt = db.prepare('SELECT * FROM users WHERE email = ? AND password = ?')
  return stmt.get(email, password) as User | undefined
}

// Booking functions
export function createBooking(booking: Booking): Booking {
  const stmt = db.prepare(`
    INSERT INTO bookings (
      user_id, name, email, phone, alternate_phone, service_type, service_slug, service_name,
      package_type, package_price, decorations, deco_prices, muhurta, preferred_date, preferred_time, address, city, notes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  const result = stmt.run(
    booking.user_id || null,
    booking.name,
    booking.email,
    booking.phone,
    booking.alternate_phone || null,
    booking.service_type,
    booking.service_slug,
    booking.service_name,
    booking.package_type,
    booking.package_price,
    booking.decorations || null,
    booking.deco_prices || null,
    booking.muhurta || null,
    booking.preferred_date,
    booking.preferred_time,
    booking.address,
    booking.city,
    booking.notes || null
  )

  return { ...booking, id: result.lastInsertRowid as number }
}

export function getBookingById(id: number): Booking | undefined {
  const stmt = db.prepare('SELECT * FROM bookings WHERE id = ?')
  return stmt.get(id) as Booking | undefined
}

export function getAllBookings(): Booking[] {
  const stmt = db.prepare('SELECT * FROM bookings ORDER BY created_at DESC')
  return stmt.all() as Booking[]
}

export function getBookingsByStatus(status: string): Booking[] {
  const stmt = db.prepare('SELECT * FROM bookings WHERE status = ? ORDER BY created_at DESC')
  return stmt.all(status) as Booking[]
}

export function getBookingsByUserId(userId: number): Booking[] {
  const stmt = db.prepare('SELECT * FROM bookings WHERE user_id = ? ORDER BY created_at DESC')
  return stmt.all(userId) as Booking[]
}

export function getBookingStats() {
  const totalStmt = db.prepare('SELECT COUNT(*) as count FROM bookings')
  const pendingStmt = db.prepare('SELECT COUNT(*) as count FROM bookings WHERE status = "pending"')
  const confirmedStmt = db.prepare('SELECT COUNT(*) as count FROM bookings WHERE status = "confirmed"')
  const completedStmt = db.prepare('SELECT COUNT(*) as count FROM bookings WHERE status = "completed"')
  const cancelledStmt = db.prepare('SELECT COUNT(*) as count FROM bookings WHERE status = "cancelled"')

  return {
    total: (totalStmt.get() as { count: number }).count,
    pending: (pendingStmt.get() as { count: number }).count,
    confirmed: (confirmedStmt.get() as { count: number }).count,
    completed: (completedStmt.get() as { count: number }).count,
    cancelled: (cancelledStmt.get() as { count: number }).count,
  }
}

export function updateBookingStatus(id: number, status: string): boolean {
  const stmt = db.prepare('UPDATE bookings SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
  const result = stmt.run(status, id)
  return result.changes > 0
}

export function deleteBooking(id: number): boolean {
  const stmt = db.prepare('DELETE FROM bookings WHERE id = ?')
  const result = stmt.run(id)
  return result.changes > 0
}

// Service functions
export function createService(service: Service): Service {
  const stmt = db.prepare(`
    INSERT INTO services (
      slug, category, title_en, title_mr, title_hi, description_en, description_mr, description_hi,
      short_en, short_mr, short_hi, image, duration,
      basic_price, basic_includes_en, basic_includes_mr, basic_includes_hi,
      standard_price, standard_includes_en, standard_includes_mr, standard_includes_hi,
      premium_price, premium_includes_en, premium_includes_mr, premium_includes_hi,
      sahitya_en, sahitya_mr, sahitya_hi, muhurta
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  const result = stmt.run(
    service.slug,
    service.category,
    service.title_en,
    service.title_mr,
    service.title_hi,
    service.description_en,
    service.description_mr,
    service.description_hi,
    service.short_en,
    service.short_mr,
    service.short_hi,
    service.image,
    service.duration,
    service.basic_price,
    service.basic_includes_en,
    service.basic_includes_mr,
    service.basic_includes_hi,
    service.standard_price,
    service.standard_includes_en,
    service.standard_includes_mr,
    service.standard_includes_hi,
    service.premium_price,
    service.premium_includes_en,
    service.premium_includes_mr,
    service.premium_includes_hi,
    service.sahitya_en,
    service.sahitya_mr,
    service.sahitya_hi,
    service.muhurta || null
  )

  return { ...service, id: result.lastInsertRowid as number }
}

export function getAllServices(): Service[] {
  const stmt = db.prepare('SELECT * FROM services ORDER BY category, title_en')
  return stmt.all() as Service[]
}

export function getServiceBySlug(slug: string): Service | undefined {
  const stmt = db.prepare('SELECT * FROM services WHERE slug = ?')
  return stmt.get(slug) as Service | undefined
}

export function getServicesByCategory(category: string): Service[] {
  const stmt = db.prepare('SELECT * FROM services WHERE category = ? ORDER BY title_en')
  return stmt.all(category) as Service[]
}

export function getServiceById(id: number): Service | undefined {
  const stmt = db.prepare('SELECT * FROM services WHERE id = ?')
  return stmt.get(id) as Service | undefined
}

export function updateService(id: number, service: Partial<Omit<Service, 'id' | 'created_at' | 'updated_at'>>): boolean {
  const fields: string[] = []
  const values: any[] = []

  Object.entries(service).forEach(([key, value]) => {
    if (value !== undefined) {
      fields.push(`${key} = ?`)
      values.push(value)
    }
  })

  if (fields.length === 0) return false

  values.push(id)
  const stmt = db.prepare(`UPDATE services SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`)
  const result = stmt.run(...values)
  return result.changes > 0
}

export function deleteService(id: number): boolean {
  const stmt = db.prepare('DELETE FROM services WHERE id = ?')
  const result = stmt.run(id)
  return result.changes > 0
}

// Decoration functions
export function createDecoration(decoration: Omit<Decoration, 'id' | 'created_at' | 'updated_at'>): Decoration {
  const stmt = db.prepare(`
    INSERT INTO decorations (service_id, name_en, name_mr, name_hi, description_en, description_mr, description_hi, price, photos)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)
  
  const result = stmt.run(
    decoration.service_id,
    decoration.name_en,
    decoration.name_mr,
    decoration.name_hi,
    decoration.description_en,
    decoration.description_mr,
    decoration.description_hi,
    decoration.price,
    decoration.photos
  )
  
  return { ...decoration, id: result.lastInsertRowid as number }
}

export function getAllDecorations(): Decoration[] {
  const stmt = db.prepare('SELECT * FROM decorations ORDER BY service_id, name_en')
  return stmt.all() as Decoration[]
}

export function getDecorationsByServiceId(serviceId: number): Decoration[] {
  const stmt = db.prepare('SELECT * FROM decorations WHERE service_id = ? ORDER BY name_en')
  return stmt.all(serviceId) as Decoration[]
}

export function getDecorationById(id: number): Decoration | undefined {
  const stmt = db.prepare('SELECT * FROM decorations WHERE id = ?')
  return stmt.get(id) as Decoration | undefined
}

export function updateDecoration(id: number, decoration: Partial<Omit<Decoration, 'id' | 'created_at' | 'updated_at'>>): boolean {
  const fields: string[] = []
  const values: any[] = []

  Object.entries(decoration).forEach(([key, value]) => {
    if (value !== undefined) {
      fields.push(`${key} = ?`)
      values.push(value)
    }
  })

  if (fields.length === 0) return false

  values.push(id)
  const stmt = db.prepare(`UPDATE decorations SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`)
  const result = stmt.run(...values)
  return result.changes > 0
}

export function deleteDecoration(id: number): boolean {
  const stmt = db.prepare('DELETE FROM decorations WHERE id = ?')
  const result = stmt.run(id)
  return result.changes > 0
}

// Hero images functions
export function getHeroImages(): HeroImages | undefined {
  const stmt = db.prepare('SELECT * FROM hero_images ORDER BY id DESC LIMIT 1')
  return stmt.get() as HeroImages | undefined
}

export function upsertHeroImages(heroImages: HeroImages): HeroImages {
  const existing = getHeroImages()
  if (existing) {
    const stmt = db.prepare('UPDATE hero_images SET desktop_image = ?, mobile_image = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
    const result = stmt.run(heroImages.desktop_image, heroImages.mobile_image, existing.id)
    return { ...heroImages, id: existing.id }
  } else {
    const stmt = db.prepare('INSERT INTO hero_images (desktop_image, mobile_image) VALUES (?, ?)')
    const result = stmt.run(heroImages.desktop_image, heroImages.mobile_image)
    return { ...heroImages, id: result.lastInsertRowid as number }
  }
}

export default db
