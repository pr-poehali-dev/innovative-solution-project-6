CREATE TABLE IF NOT EXISTS materials (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price VARCHAR(100) NOT NULL,
    unit VARCHAR(50) DEFAULT 'шт',
    description TEXT DEFAULT '',
    image_url TEXT DEFAULT '',
    in_stock BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_materials_category ON materials(category);
CREATE INDEX IF NOT EXISTS idx_materials_sort ON materials(sort_order, id);