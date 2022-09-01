const inspection = `INSERT INTO public.inspection_validation("Local Status", "Pending", "Pre-stock after Inspection", "Pre-scrap", "Scrap after approval", "Transfer Scrap")
VALUES
('Pending', null, false, false, false, false),
('Pre-stock after Inspection', true, null, false, false, false),
('Pre-scrap', false, true, null, true, false),
('Scrap after approval', false, false, false, null, false),
('Transfer Scrap', false, false, true, true, null)`

const storage = `INSERT INTO public.storage_validation(
"Local Status", "Stock", "Pre-repair on SRDC", "Pre-repair on SERK",
"Transfer to SERK", "Transfer to Consignment", "Pre-verification", "Transfer verification", "Pre-scrap", "Scrap after approval", "Transfer Scrap")
VALUES
('Stock', null, true, true, false, false, true, false, false, false, false),
('Pre-repair on SRDC', true, null, false, false, true, false, false, false, false, false),
('Pre-repair on SERK', true, false, null, false, false, true, false, false, false, false),
('Transfer to SERK', false, false, true, null, false, false, false, false, false, false),
('Transfer to Consignment', false, true, true, false, null, false, false, false, false, false),
('Pre-verification', true, false, false, false, false, null, false, false, false, false),
('Transfer verification', false, false, false, false, false, true, null, false, false, false),
('Pre-scrap', true, true, false, false, false, false, false, null, true, false),
('Scrap after approval', true, false, false, false, false, false, false, false, null, false),
('Transfer Scrap', false, false, false, false, false, false, false, true, true, null)`

const repair = `INSERT INTO public.repair_validation(
"Local Status", "On Repair", "Pre-stock after repair")
VALUES ('On Repair', null, false),
('Pre-stock after repair', true, null)`

export const valid_obj = {
  inspection,
  storage,
  repair
}
