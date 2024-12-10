create table if not exists public.customers (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    name text not null,
    email text,
    phone text
);

-- Habilitar RLS
alter table public.customers enable row level security;

-- Criar políticas
create policy "Enable read access for all users"
    on customers for select
    to authenticated
    using (true);

create policy "Enable insert access for all users"
    on customers for insert
    to authenticated
    with check (true);

create policy "Enable update access for all users"
    on customers for update
    to authenticated
    using (true);

create policy "Enable delete access for all users"
    on customers for delete
    to authenticated
    using (true);

-- Criar trigger para updated_at
DROP TRIGGER IF EXISTS handle_updated_at ON public.customers;
create trigger handle_updated_at before update on public.customers
    for each row execute procedure moddatetime (updated_at);