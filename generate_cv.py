import os
import docx
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def set_cell_background(cell, fill_hex):
    """Sets background color of a cell."""
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    """Sets cell margins (padding) in twentieths of a point (dxa). 20 dxa = 1 pt."""
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(
        f'<w:tcMar {nsdecls("w")}>'
        f'<w:top w:w="{top}" w:type="dxa"/>'
        f'<w:bottom w:w="{bottom}" w:type="dxa"/>'
        f'<w:left w:w="{left}" w:type="dxa"/>'
        f'<w:right w:w="{right}" w:type="dxa"/>'
        f'</w:tcMar>'
    )
    tcPr.append(tcMar)

def set_cell_border(cell, **kwargs):
    """
    kwargs can be top, bottom, left, right.
    values: dict(sz=12, val='single', color='0F2537')
    """
    tcPr = cell._tc.get_or_add_tcPr()
    tcBorders = parse_xml(f'<w:tcBorders {nsdecls("w")}/>')
    for edge in ('top', 'left', 'bottom', 'right', 'insideH', 'insideV'):
        edge_data = kwargs.get(edge)
        if edge_data:
            tag = f'<w:{edge} {nsdecls("w")} w:val="{edge_data.get("val", "single")}" w:sz="{edge_data.get("sz", 4)}" w:space="0" w:color="{edge_data.get("color", "auto")}"/>'
        else:
            tag = f'<w:{edge} {nsdecls("w")} w:val="none"/>'
        tcBorders.append(parse_xml(tag))
    tcPr.append(tcBorders)

def prevent_row_split(row):
    """Prevents a table row from splitting across pages."""
    trPr = row._tr.get_or_add_trPr()
    trPr.append(parse_xml(f'<w:cantSplit {nsdecls("w")}/>'))

def format_table(table):
    """Sets table to fixed layout and removes default borders."""
    tblPr = table._tbl.tblPr
    tblLayout = parse_xml(f'<w:tblLayout {nsdecls("w")} w:type="fixed"/>')
    tblPr.append(tblLayout)
    tblBorders = parse_xml(
        f'<w:tblBorders {nsdecls("w")}>'
        f'<w:top w:val="none"/>'
        f'<w:left w:val="none"/>'
        f'<w:bottom w:val="none"/>'
        f'<w:right w:val="none"/>'
        f'<w:insideH w:val="none"/>'
        f'<w:insideV w:val="none"/>'
        f'</w:tblBorders>'
    )
    tblPr.append(tblBorders)

def make_cv():
    doc = Document()
    
    # Page Setup - Margins 0.75 in (54 pt)
    for section in doc.sections:
        section.top_margin = Inches(0.65)
        section.bottom_margin = Inches(0.65)
        section.left_margin = Inches(0.7)
        section.right_margin = Inches(0.7)
        section.header_distance = Inches(0.35)
        section.footer_distance = Inches(0.35)

    # Palette
    C_PRIMARY = RGBColor(15, 37, 55)       # Deep Slate Navy #0F2537
    C_SECONDARY = RGBColor(30, 64, 175)    # Rich Blue #1E40AF
    C_ACCENT = RGBColor(2, 132, 199)       # Sky/Cyan Accent #0284C7
    C_DARK = RGBColor(30, 41, 59)          # Charcoal Text #1E293B
    C_MUTED = RGBColor(100, 116, 139)      # Slate Gray #64748B
    
    HEX_PRIMARY = "0F2537"
    HEX_SECONDARY = "1E40AF"
    HEX_ACCENT = "0284C7"
    HEX_BG_LIGHT = "F8FAFC"
    HEX_BG_CARD = "F1F5F9"
    HEX_BORDER = "CBD5E1"
    
    # Styles
    style_normal = doc.styles['Normal']
    style_normal.font.name = 'Calibri'
    style_normal.font.size = Pt(9.5)
    style_normal.font.color.rgb = C_DARK

    # Footer
    footer = doc.sections[0].footer
    footer_p = footer.paragraphs[0]
    footer_p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    f_run = footer_p.add_run("Álvaro Antonio Chávez Trespalacio  •  Hoja de Vida Profesional")
    f_run.font.size = Pt(8.5)
    f_run.font.color.rgb = RGBColor(148, 163, 184)

    # ------------------ HEADER ------------------
    header_table = doc.add_table(rows=2, cols=1)
    header_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    format_table(header_table)
    
    # Row 0: Navy Main Banner
    r0 = header_table.rows[0]
    prevent_row_split(r0)
    c0 = r0.cells[0]
    c0.width = Inches(7.1)
    set_cell_background(c0, HEX_PRIMARY)
    set_cell_margins(c0, top=260, bottom=220, left=300, right=300)
    set_cell_border(c0)
    
    hp = c0.paragraphs[0]
    hp.paragraph_format.space_before = Pt(0)
    hp.paragraph_format.space_after = Pt(2)
    hrun = hp.add_run("ÁLVARO ANTONIO CHÁVEZ TRESPALACIO")
    hrun.font.size = Pt(21)
    hrun.font.bold = True
    hrun.font.color.rgb = RGBColor(255, 255, 255)
    
    sub_p = c0.add_paragraph()
    sub_p.paragraph_format.space_before = Pt(0)
    sub_p.paragraph_format.space_after = Pt(10)
    sub_run = sub_p.add_run("TÉCNICO EN CONSTRUCCIÓN  |  TECNÓLOGO PROFESIONAL EN CONSTRUCCIÓN")
    sub_run.font.size = Pt(10)
    sub_run.font.bold = True
    sub_run.font.color.rgb = RGBColor(147, 197, 253) # Light Blue
    
    # Contact strip inside header
    contact_p = c0.add_paragraph()
    contact_p.paragraph_format.space_before = Pt(0)
    contact_p.paragraph_format.space_after = Pt(0)
    
    def add_contact_item(p, label, value, is_last=False):
        lbl = p.add_run(label + ": ")
        lbl.font.size = Pt(9)
        lbl.font.bold = True
        lbl.font.color.rgb = RGBColor(203, 213, 225)
        val = p.add_run(value)
        val.font.size = Pt(9)
        val.font.color.rgb = RGBColor(255, 255, 255)
        if not is_last:
            sep = p.add_run("   •   ")
            sep.font.size = Pt(9)
            sep.font.color.rgb = RGBColor(147, 197, 253)
            
    add_contact_item(contact_p, "Teléfono", "301 448 5396 - 317 356 3789")
    add_contact_item(contact_p, "E-mail", "Alchatres@hotmail.com")
    add_contact_item(contact_p, "Dirección", "Barrio Atlántico parte baja", is_last=True)
    
    # Row 1: Slim cyan accent line
    r1 = header_table.rows[1]
    prevent_row_split(r1)
    c1 = r1.cells[0]
    c1.width = Inches(7.1)
    set_cell_background(c1, HEX_ACCENT)
    set_cell_margins(c1, top=20, bottom=20, left=0, right=0)
    set_cell_border(c1)
    p_line = c1.paragraphs[0]
    p_line.paragraph_format.space_before = Pt(0)
    p_line.paragraph_format.space_after = Pt(0)
    
    # Spacing after header
    sp = doc.add_paragraph()
    sp.paragraph_format.space_before = Pt(0)
    sp.paragraph_format.space_after = Pt(8)

    # Helper for Section Titles
    def add_section_header(title):
        tbl = doc.add_table(rows=1, cols=1)
        tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
        format_table(tbl)
        prevent_row_split(tbl.rows[0])
        
        cell = tbl.rows[0].cells[0]
        cell.width = Inches(7.1)
        set_cell_background(cell, "F8FAFC")
        set_cell_margins(cell, top=100, bottom=100, left=160, right=160)
        set_cell_border(cell, 
                        left={'sz': 24, 'val': 'single', 'color': HEX_SECONDARY},
                        bottom={'sz': 4, 'val': 'single', 'color': HEX_BORDER})
        
        p = cell.paragraphs[0]
        p.paragraph_format.space_before = Pt(2)
        p.paragraph_format.space_after = Pt(2)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(title.upper())
        run.font.size = Pt(10.5)
        run.font.bold = True
        run.font.color.rgb = C_PRIMARY
        
        # small space after table
        post_p = doc.add_paragraph()
        post_p.paragraph_format.space_before = Pt(0)
        post_p.paragraph_format.space_after = Pt(4)
        post_p.paragraph_format.keep_with_next = True

    # ------------------ PERFIL OCUPACIONAL ------------------
    add_section_header("Perfil Ocupacional")
    
    profile_tbl = doc.add_table(rows=1, cols=1)
    profile_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    format_table(profile_tbl)
    prevent_row_split(profile_tbl.rows[0])
    
    p_cell = profile_tbl.rows[0].cells[0]
    p_cell.width = Inches(7.1)
    set_cell_background(p_cell, HEX_BG_LIGHT)
    set_cell_margins(p_cell, top=140, bottom=140, left=200, right=200)
    set_cell_border(p_cell, 
                    left={'sz': 16, 'val': 'single', 'color': HEX_ACCENT},
                    top={'sz': 4, 'val': 'single', 'color': 'E2E8F0'},
                    right={'sz': 4, 'val': 'single', 'color': 'E2E8F0'},
                    bottom={'sz': 4, 'val': 'single', 'color': 'E2E8F0'})
    
    prof_p = p_cell.paragraphs[0]
    prof_p.paragraph_format.space_before = Pt(0)
    prof_p.paragraph_format.space_after = Pt(0)
    prof_p.paragraph_format.line_spacing = 1.15
    prof_p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    prof_run = prof_p.add_run(
        "Tecnólogo en Construcción Egresado del servicio nacional de aprendizaje SENA, se define como una "
        "persona con grandes cualidades y aptitudes tanto físicas como mentales así como su alto espíritu de "
        "superación personal; ha demostrado ser una persona honesta, trabajadora y en la cual se puede confiar, "
        "posee aptas cualidades para su trabajo. Se desenvuelve con agrado en su labor, con iniciativa e ingenio "
        "para superar los distintos obstáculos que se puedan presentar en su labor. Una de las grandes cualidades "
        "que atesora Álvaro A. Chávez Trespalacio y que lo hacen valioso en cualquier empresa es sin duda su "
        "capacidad de trabajar en equipo y desarrollar un ambiente optimo de motivación contagiosa con el conjunto "
        "de sus compañeros."
    )
    prof_run.font.size = Pt(9.5)
    prof_run.font.color.rgb = C_DARK
    
    sp2 = doc.add_paragraph()
    sp2.paragraph_format.space_before = Pt(0)
    sp2.paragraph_format.space_after = Pt(8)

    # ------------------ DATOS PERSONALES ------------------
    add_section_header("Datos Personales")
    
    personal_data = [
        ("Nombres", "ALVARO ANTONIO", "Apellidos", "CHAVEZ TRESPALACIO"),
        ("Cédula de Ciudadanía", "3.816.285 de Barranco de Loba, Bol.", "Libreta Militar No.", "3.816.285 Distrito No. 37"),
        ("Registro No.", "SGC2008DP00054", "Certificado Judicial", "Vigente"),
        ("Fecha de Nacimiento", "17 de Noviembre de 1963", "Lugar de Nacimiento", "Tamalameque, Cesar"),
        ("Estado Civil", "Unión Libre", "Dirección", "Barrio Atlántico parte baja"),
        ("Teléfono", "3014485396 - 3173563789", "E-mail", "Alchatres@hotmail.com"),
    ]
    
    dp_table = doc.add_table(rows=len(personal_data), cols=4)
    dp_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    format_table(dp_table)
    col_widths = [Inches(1.65), Inches(1.9), Inches(1.65), Inches(1.9)]
    
    for row_idx, row_data in enumerate(personal_data):
        row = dp_table.rows[row_idx]
        prevent_row_split(row)
        bg = HEX_BG_LIGHT if row_idx % 2 == 0 else "FFFFFF"
        for col_idx in range(4):
            c = row.cells[col_idx]
            c.width = col_widths[col_idx]
            set_cell_background(c, bg)
            set_cell_margins(c, top=75, bottom=75, left=100, right=100)
            set_cell_border(c, bottom={'sz': 4, 'val': 'single', 'color': 'F1F5F9'})
            
        # Col 0: Label 1
        p0 = row.cells[0].paragraphs[0]
        p0.paragraph_format.space_before = Pt(0)
        p0.paragraph_format.space_after = Pt(0)
        r0 = p0.add_run(row_data[0])
        r0.font.bold = True
        r0.font.size = Pt(8.5)
        r0.font.color.rgb = C_MUTED
        
        # Col 1: Val 1
        p1 = row.cells[1].paragraphs[0]
        p1.paragraph_format.space_before = Pt(0)
        p1.paragraph_format.space_after = Pt(0)
        r1 = p1.add_run(row_data[1])
        r1.font.bold = False
        r1.font.size = Pt(9)
        r1.font.color.rgb = C_DARK
        
        # Col 2: Label 2
        p2 = row.cells[2].paragraphs[0]
        p2.paragraph_format.space_before = Pt(0)
        p2.paragraph_format.space_after = Pt(0)
        r2 = p2.add_run(row_data[2])
        r2.font.bold = True
        r2.font.size = Pt(8.5)
        r2.font.color.rgb = C_MUTED
        
        # Col 3: Val 2
        p3 = row.cells[3].paragraphs[0]
        p3.paragraph_format.space_before = Pt(0)
        p3.paragraph_format.space_after = Pt(0)
        r3 = p3.add_run(row_data[3])
        r3.font.bold = False
        r3.font.size = Pt(9)
        r3.font.color.rgb = C_DARK

    sp3 = doc.add_paragraph()
    sp3.paragraph_format.space_before = Pt(0)
    sp3.paragraph_format.space_after = Pt(8)

    # ------------------ EXPERIENCIA LABORAL ------------------
    add_section_header("Experiencia Laboral")
    
    jobs = [
        {
            "empresa": "RESTREPO Y URIBE LTDA.",
            "cargo": "INSPECTOR DE INTERVENTORIA EN VIAS",
            "tiempo": "9 MESES",
            "jefe": "CLIMACO URUTIA",
            "direccion": "CALLE 95 No. 15-47 PISO 6, Bogotá D.C.",
            "telefono": "6227160"
        },
        {
            "empresa": "CONSTRUCTORA A&C S.A.",
            "cargo": "INSPECTOR EN EDIFICACIONES",
            "tiempo": "1 AÑO",
            "jefe": "YUDITH ASTRID GARCIA",
            "direccion": "AV. CARACAS No. 63-32 OFIC. 301",
            "telefono": "640 5424 - 640 9433"
        },
        {
            "empresa": "CONSTRUCCION HOTEL SUNRISE BEACH",
            "cargo": "MAESTRO CONTRATISTA",
            "tiempo": "4 AÑOS",
            "jefe": "PABLO SILVA",
            "direccion": "Av. Newball",
            "telefono": None
        },
        {
            "empresa": "HABITAT PARA LA HUMANIDAD COL.",
            "cargo": "MAESTRO CONTRATISTA",
            "tiempo": "5 MESES",
            "jefe": "NINOSKA HUDSON",
            "direccion": "AV. 20 JULIO EDIF. EMPERADOR 2 PISO",
            "telefono": None
        }
    ]
    
    for idx, job in enumerate(jobs):
        j_tbl = doc.add_table(rows=2, cols=2)
        j_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
        format_table(j_tbl)
        prevent_row_split(j_tbl.rows[0])
        prevent_row_split(j_tbl.rows[1])
        
        # Row 0: Top title bar (Cargo + Empresa on left, Tiempo on right)
        r0_c0 = j_tbl.rows[0].cells[0]
        r0_c1 = j_tbl.rows[0].cells[1]
        r0_c0.width = Inches(5.3)
        r0_c1.width = Inches(1.8)
        
        set_cell_background(r0_c0, "F1F5F9")
        set_cell_background(r0_c1, "F1F5F9")
        set_cell_margins(r0_c0, top=100, bottom=50, left=140, right=80)
        set_cell_margins(r0_c1, top=100, bottom=50, left=80, right=140)
        set_cell_border(r0_c0, 
                        top={'sz': 4, 'val': 'single', 'color': HEX_BORDER},
                        left={'sz': 16, 'val': 'single', 'color': HEX_SECONDARY})
        set_cell_border(r0_c1, 
                        top={'sz': 4, 'val': 'single', 'color': HEX_BORDER},
                        right={'sz': 4, 'val': 'single', 'color': HEX_BORDER})
        
        p_title = r0_c0.paragraphs[0]
        p_title.paragraph_format.space_before = Pt(0)
        p_title.paragraph_format.space_after = Pt(2)
        run_cargo = p_title.add_run(job["cargo"])
        run_cargo.font.bold = True
        run_cargo.font.size = Pt(9.5)
        run_cargo.font.color.rgb = C_PRIMARY
        
        p_comp = r0_c0.add_paragraph()
        p_comp.paragraph_format.space_before = Pt(0)
        p_comp.paragraph_format.space_after = Pt(2)
        run_comp_lbl = p_comp.add_run("Empresa: ")
        run_comp_lbl.font.bold = True
        run_comp_lbl.font.size = Pt(8.5)
        run_comp_lbl.font.color.rgb = C_MUTED
        run_comp = p_comp.add_run(job["empresa"])
        run_comp.font.bold = True
        run_comp.font.size = Pt(9)
        run_comp.font.color.rgb = C_DARK
        
        p_dur = r0_c1.paragraphs[0]
        p_dur.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        p_dur.paragraph_format.space_before = Pt(0)
        p_dur.paragraph_format.space_after = Pt(0)
        run_dur_lbl = p_dur.add_run("Tiempo de servicio:\n")
        run_dur_lbl.font.size = Pt(8)
        run_dur_lbl.font.color.rgb = C_MUTED
        run_dur = p_dur.add_run(job["tiempo"])
        run_dur.font.bold = True
        run_dur.font.size = Pt(9.5)
        run_dur.font.color.rgb = C_SECONDARY
        
        # Row 1: Details (Jefe inmediato, Teléfono, Dirección)
        r1_c0 = j_tbl.rows[1].cells[0]
        r1_c1 = j_tbl.rows[1].cells[1]
        r1_c0.width = Inches(5.3)
        r1_c1.width = Inches(1.8)
        
        set_cell_background(r1_c0, "FFFFFF")
        set_cell_background(r1_c1, "FFFFFF")
        set_cell_margins(r1_c0, top=50, bottom=90, left=140, right=80)
        set_cell_margins(r1_c1, top=50, bottom=90, left=80, right=140)
        set_cell_border(r1_c0, 
                        bottom={'sz': 6, 'val': 'single', 'color': 'E2E8F0'},
                        left={'sz': 16, 'val': 'single', 'color': HEX_SECONDARY})
        set_cell_border(r1_c1, 
                        bottom={'sz': 6, 'val': 'single', 'color': 'E2E8F0'},
                        right={'sz': 4, 'val': 'single', 'color': HEX_BORDER})
        
        p_det = r1_c0.paragraphs[0]
        p_det.paragraph_format.space_before = Pt(0)
        p_det.paragraph_format.space_after = Pt(0)
        
        r_jef_lbl = p_det.add_run("Jefe Inmediato: ")
        r_jef_lbl.font.bold = True
        r_jef_lbl.font.size = Pt(8.5)
        r_jef_lbl.font.color.rgb = C_MUTED
        r_jef = p_det.add_run(job["jefe"] + "   |   ")
        r_jef.font.size = Pt(8.5)
        r_jef.font.color.rgb = C_DARK
        
        r_dir_lbl = p_det.add_run("Dirección: ")
        r_dir_lbl.font.bold = True
        r_dir_lbl.font.size = Pt(8.5)
        r_dir_lbl.font.color.rgb = C_MUTED
        r_dir = p_det.add_run(job["direccion"])
        r_dir.font.size = Pt(8.5)
        r_dir.font.color.rgb = C_DARK
        
        p_tel = r1_c1.paragraphs[0]
        p_tel.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        p_tel.paragraph_format.space_before = Pt(0)
        p_tel.paragraph_format.space_after = Pt(0)
        if job["telefono"]:
            r_tel_lbl = p_tel.add_run("Teléfono:\n")
            r_tel_lbl.font.bold = True
            r_tel_lbl.font.size = Pt(8)
            r_tel_lbl.font.color.rgb = C_MUTED
            r_tel = p_tel.add_run(job["telefono"])
            r_tel.font.size = Pt(8.5)
            r_tel.font.color.rgb = C_DARK
            
        sp_job = doc.add_paragraph()
        sp_job.paragraph_format.space_before = Pt(0)
        sp_job.paragraph_format.space_after = Pt(4)

    # ------------------ ESTUDIOS REALIZADOS ------------------
    add_section_header("Estudios Realizados")
    
    def add_subheading(title):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(5)
        p.paragraph_format.space_after = Pt(2)
        p.paragraph_format.keep_with_next = True
        run = p.add_run("▸ " + title)
        run.font.bold = True
        run.font.size = Pt(9)
        run.font.color.rgb = C_SECONDARY

    # 1. Educación Técnica y Tecnológica
    add_subheading("FORMACIÓN TÉCNICA Y TECNOLÓGICA")
    t_tbl = doc.add_table(rows=1, cols=2)
    t_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    format_table(t_tbl)
    prevent_row_split(t_tbl.rows[0])
    
    c0, c1 = t_tbl.rows[0].cells[0], t_tbl.rows[0].cells[1]
    c0.width = Inches(4.5)
    c1.width = Inches(2.6)
    set_cell_background(c0, HEX_BG_LIGHT)
    set_cell_background(c1, HEX_BG_LIGHT)
    set_cell_margins(c0, top=90, bottom=90, left=140, right=80)
    set_cell_margins(c1, top=90, bottom=90, left=80, right=140)
    set_cell_border(c0, 
                    top={'sz': 4, 'val': 'single', 'color': HEX_BORDER},
                    bottom={'sz': 4, 'val': 'single', 'color': HEX_BORDER},
                    left={'sz': 12, 'val': 'single', 'color': HEX_ACCENT})
    set_cell_border(c1, 
                    top={'sz': 4, 'val': 'single', 'color': HEX_BORDER},
                    bottom={'sz': 4, 'val': 'single', 'color': HEX_BORDER},
                    right={'sz': 4, 'val': 'single', 'color': HEX_BORDER})
    
    p_t0 = c0.paragraphs[0]
    p_t0.paragraph_format.space_before = Pt(0)
    p_t0.paragraph_format.space_after = Pt(2)
    r_inst = p_t0.add_run("SENA (Servicio Nacional de Aprendizaje)\n")
    r_inst.font.bold = True
    r_inst.font.size = Pt(9.5)
    r_inst.font.color.rgb = C_PRIMARY
    r_prog = p_t0.add_run("Técnico en Construcción")
    r_prog.font.size = Pt(8.5)
    r_prog.font.color.rgb = C_DARK
    
    p_t1 = c1.paragraphs[0]
    p_t1.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_t1.paragraph_format.space_before = Pt(0)
    p_t1.paragraph_format.space_after = Pt(0)
    r_tit_lbl = p_t1.add_run("Título Obtenido:\n")
    r_tit_lbl.font.bold = True
    r_tit_lbl.font.size = Pt(8)
    r_tit_lbl.font.color.rgb = C_MUTED
    r_tit = p_t1.add_run("TECNÓLOGO PROFESIONAL EN CONSTRUCCIÓN")
    r_tit.font.bold = True
    r_tit.font.size = Pt(8.5)
    r_tit.font.color.rgb = C_SECONDARY

    # 2. Diplomados
    add_subheading("DIPLOMADOS")
    dip_tbl = doc.add_table(rows=1, cols=2)
    dip_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    format_table(dip_tbl)
    prevent_row_split(dip_tbl.rows[0])
    
    dc0, dc1 = dip_tbl.rows[0].cells[0], dip_tbl.rows[0].cells[1]
    dc0.width = Inches(4.5)
    dc1.width = Inches(2.6)
    set_cell_background(dc0, "FFFFFF")
    set_cell_background(dc1, "FFFFFF")
    set_cell_margins(dc0, top=90, bottom=90, left=140, right=80)
    set_cell_margins(dc1, top=90, bottom=90, left=80, right=140)
    set_cell_border(dc0, 
                    top={'sz': 4, 'val': 'single', 'color': HEX_BORDER},
                    bottom={'sz': 4, 'val': 'single', 'color': HEX_BORDER},
                    left={'sz': 12, 'val': 'single', 'color': HEX_ACCENT})
    set_cell_border(dc1, 
                    top={'sz': 4, 'val': 'single', 'color': HEX_BORDER},
                    bottom={'sz': 4, 'val': 'single', 'color': HEX_BORDER},
                    right={'sz': 4, 'val': 'single', 'color': HEX_BORDER})
    
    p_d0 = dc0.paragraphs[0]
    p_d0.paragraph_format.space_before = Pt(0)
    p_d0.paragraph_format.space_after = Pt(2)
    r_dinst = p_d0.add_run("UNIVERSIDAD NACIONAL SEDE CARIBE\n")
    r_dinst.font.bold = True
    r_dinst.font.size = Pt(9.5)
    r_dinst.font.color.rgb = C_PRIMARY
    r_dprog = p_d0.add_run("Interventoría de Proyectos y Obras")
    r_dprog.font.bold = True
    r_dprog.font.size = Pt(8.5)
    r_dprog.font.color.rgb = C_DARK
    
    p_d1 = dc1.paragraphs[0]
    p_d1.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_d1.paragraph_format.space_before = Pt(0)
    p_d1.paragraph_format.space_after = Pt(0)
    r_dint = p_d1.add_run("Intensidad Horaria: 100 Horas\n")
    r_dint.font.bold = True
    r_dint.font.size = Pt(8.5)
    r_dint.font.color.rgb = C_SECONDARY
    r_dfecha = p_d1.add_run("4 de Septiembre – 8 de Noviembre de 2008")
    r_dfecha.font.size = Pt(8)
    r_dfecha.font.color.rgb = C_MUTED

    # 3. Seminarios
    add_subheading("SEMINARIOS")
    seminars = [
        ("SIKA", "CONSTRUCCIÓN Y REPARACIÓN EDIFICACIONES Y OBRAS CIVILES", "Mayo 2007"),
        ("BASF CONSTRUCTION CHEMICALS COL.", "TECNOLOGÍA DEL CONCRETO", "Mayo 2007"),
        ("PHILAAC", "PINTURA", "Junio 2000"),
    ]
    sem_tbl = doc.add_table(rows=len(seminars), cols=3)
    sem_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    format_table(sem_tbl)
    sem_widths = [Inches(2.5), Inches(3.3), Inches(1.3)]
    for s_idx, (s_inst, s_tema, s_date) in enumerate(seminars):
        s_row = sem_tbl.rows[s_idx]
        prevent_row_split(s_row)
        s_bg = HEX_BG_LIGHT if s_idx % 2 == 0 else "FFFFFF"
        for sc_idx in range(3):
            sc = s_row.cells[sc_idx]
            sc.width = sem_widths[sc_idx]
            set_cell_background(sc, s_bg)
            set_cell_margins(sc, top=55, bottom=55, left=100, right=100)
            set_cell_border(sc, bottom={'sz': 4, 'val': 'single', 'color': 'F1F5F9'})
            
        p_s0 = s_row.cells[0].paragraphs[0]
        p_s0.paragraph_format.space_before = Pt(0)
        p_s0.paragraph_format.space_after = Pt(0)
        r_s0 = p_s0.add_run(s_inst)
        r_s0.font.bold = True
        r_s0.font.size = Pt(8.5)
        r_s0.font.color.rgb = C_PRIMARY
        
        p_s1 = s_row.cells[1].paragraphs[0]
        p_s1.paragraph_format.space_before = Pt(0)
        p_s1.paragraph_format.space_after = Pt(0)
        r_s1 = p_s1.add_run(s_tema)
        r_s1.font.size = Pt(8.5)
        r_s1.font.color.rgb = C_DARK
        
        p_s2 = s_row.cells[2].paragraphs[0]
        p_s2.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        p_s2.paragraph_format.space_before = Pt(0)
        p_s2.paragraph_format.space_after = Pt(0)
        r_s2 = p_s2.add_run(s_date)
        r_s2.font.size = Pt(8.5)
        r_s2.font.color.rgb = C_MUTED

    # 4. Educación Secundaria y Primaria
    add_subheading("EDUCACIÓN SECUNDARIA Y PRIMARIA")
    edu_other = [
        ("SECUNDARIOS", "Colegio Julio R. Facio Lince (5 Años, Barranco de Loba Bol.)\nInstituto Técnico Industrial (1 Año, San Andrés Isla)", "TÍTULO: BACHILLER ACADÉMICO"),
        ("PRIMARIA", "Escuela Francisco de Paula Santander (5 Años, Barranco de Loba Bol.)", "")
    ]
    eo_tbl = doc.add_table(rows=len(edu_other), cols=3)
    eo_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    format_table(eo_tbl)
    eo_widths = [Inches(1.5), Inches(3.8), Inches(1.8)]
    for e_idx, (e_level, e_inst, e_tit) in enumerate(edu_other):
        e_row = eo_tbl.rows[e_idx]
        prevent_row_split(e_row)
        e_bg = HEX_BG_LIGHT if e_idx % 2 == 0 else "FFFFFF"
        for ec_idx in range(3):
            ec = e_row.cells[ec_idx]
            ec.width = eo_widths[ec_idx]
            set_cell_background(ec, e_bg)
            set_cell_margins(ec, top=65, bottom=65, left=100, right=100)
            set_cell_border(ec, bottom={'sz': 4, 'val': 'single', 'color': 'F1F5F9'})
            
        p_e0 = e_row.cells[0].paragraphs[0]
        p_e0.paragraph_format.space_before = Pt(0)
        p_e0.paragraph_format.space_after = Pt(0)
        r_e0 = p_e0.add_run(e_level)
        r_e0.font.bold = True
        r_e0.font.size = Pt(8.5)
        r_e0.font.color.rgb = C_MUTED
        
        p_e1 = e_row.cells[1].paragraphs[0]
        p_e1.paragraph_format.space_before = Pt(0)
        p_e1.paragraph_format.space_after = Pt(0)
        r_e1 = p_e1.add_run(e_inst)
        r_e1.font.size = Pt(8.5)
        r_e1.font.color.rgb = C_DARK
        
        p_e2 = e_row.cells[2].paragraphs[0]
        p_e2.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        p_e2.paragraph_format.space_before = Pt(0)
        p_e2.paragraph_format.space_after = Pt(0)
        r_e2 = p_e2.add_run(e_tit)
        r_e2.font.bold = True
        r_e2.font.size = Pt(8.5)
        r_e2.font.color.rgb = C_SECONDARY

    sp4 = doc.add_paragraph()
    sp4.paragraph_format.space_before = Pt(0)
    sp4.paragraph_format.space_after = Pt(8)

    # ------------------ REFERENCIAS ------------------
    add_section_header("Referencias")
    
    ref_tbl = doc.add_table(rows=1, cols=2)
    ref_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    format_table(ref_tbl)
    prevent_row_split(ref_tbl.rows[0])
    
    rc0, rc1 = ref_tbl.rows[0].cells[0], ref_tbl.rows[0].cells[1]
    rc0.width = Inches(3.5)
    rc1.width = Inches(3.5)
    
    set_cell_background(rc0, HEX_BG_LIGHT)
    set_cell_background(rc1, HEX_BG_LIGHT)
    set_cell_margins(rc0, top=120, bottom=120, left=140, right=140)
    set_cell_margins(rc1, top=120, bottom=120, left=140, right=140)
    set_cell_border(rc0, 
                    top={'sz': 4, 'val': 'single', 'color': HEX_BORDER},
                    bottom={'sz': 4, 'val': 'single', 'color': HEX_BORDER},
                    left={'sz': 12, 'val': 'single', 'color': HEX_SECONDARY},
                    right={'sz': 4, 'val': 'single', 'color': HEX_BORDER})
    set_cell_border(rc1, 
                    top={'sz': 4, 'val': 'single', 'color': HEX_BORDER},
                    bottom={'sz': 4, 'val': 'single', 'color': HEX_BORDER},
                    left={'sz': 12, 'val': 'single', 'color': HEX_SECONDARY},
                    right={'sz': 4, 'val': 'single', 'color': HEX_BORDER})

    # Referencias Personales
    p_rp_title = rc0.paragraphs[0]
    p_rp_title.paragraph_format.space_before = Pt(0)
    p_rp_title.paragraph_format.space_after = Pt(6)
    r_rpt = p_rp_title.add_run("REFERENCIAS PERSONALES")
    r_rpt.font.bold = True
    r_rpt.font.size = Pt(9.5)
    r_rpt.font.color.rgb = C_PRIMARY

    ref_personales = [
        {"nombre": "NASLY MARCILIA", "empresa": "SENA", "ocupacion": "Arquitecta", "telefono": "316 2701461"},
        {"nombre": "LIDA DE LA PEÑA", "empresa": "CONSTRUCTORA S.A", "ocupacion": "Ingeniera", "telefono": "300 5606687"}
    ]
    for idx_r, r in enumerate(ref_personales):
        p_ref = rc0.add_paragraph()
        p_ref.paragraph_format.space_before = Pt(0)
        p_ref.paragraph_format.space_after = Pt(6 if idx_r == 0 else 0)
        
        r_n = p_ref.add_run(r["nombre"] + "\n")
        r_n.font.bold = True
        r_n.font.size = Pt(9)
        r_n.font.color.rgb = C_DARK
        
        r_oc = p_ref.add_run(f"Ocupación: {r['ocupacion']}\n")
        r_oc.font.size = Pt(8.5)
        r_oc.font.color.rgb = C_MUTED
        
        r_em = p_ref.add_run(f"Empresa: {r['empresa']}\n")
        r_em.font.size = Pt(8.5)
        r_em.font.color.rgb = C_MUTED
        
        r_tel_l = p_ref.add_run("Teléfono: ")
        r_tel_l.font.bold = True
        r_tel_l.font.size = Pt(8.5)
        r_tel_l.font.color.rgb = C_MUTED
        r_tel = p_ref.add_run(r["telefono"])
        r_tel.font.bold = True
        r_tel.font.size = Pt(8.5)
        r_tel.font.color.rgb = C_SECONDARY

    # Referencias Familiares
    p_rf_title = rc1.paragraphs[0]
    p_rf_title.paragraph_format.space_before = Pt(0)
    p_rf_title.paragraph_format.space_after = Pt(6)
    r_rft = p_rf_title.add_run("REFERENCIAS FAMILIARES")
    r_rft.font.bold = True
    r_rft.font.size = Pt(9.5)
    r_rft.font.color.rgb = C_PRIMARY

    ref_familiares = [
        {"nombre": "TONY CAMARGO TRESPALACIO", "empresa": "CAMARA DE COMERCIO SAI", "ocupacion": "Coordinador Administrativo", "telefono": "318 8043060"},
        {"nombre": "EDINSON HAWKINS TRESPALACIO", "empresa": "SOCIEDAD PORTUARIA SAI", "ocupacion": "Gerente", "telefono": "513 1868"}
    ]
    for idx_rf, r in enumerate(ref_familiares):
        p_ref = rc1.add_paragraph()
        p_ref.paragraph_format.space_before = Pt(0)
        p_ref.paragraph_format.space_after = Pt(6 if idx_rf == 0 else 0)
        
        r_n = p_ref.add_run(r["nombre"] + "\n")
        r_n.font.bold = True
        r_n.font.size = Pt(9)
        r_n.font.color.rgb = C_DARK
        
        r_oc = p_ref.add_run(f"Ocupación: {r['ocupacion']}\n")
        r_oc.font.size = Pt(8.5)
        r_oc.font.color.rgb = C_MUTED
        
        r_em = p_ref.add_run(f"Empresa: {r['empresa']}\n")
        r_em.font.size = Pt(8.5)
        r_em.font.color.rgb = C_MUTED
        
        r_tel_l = p_ref.add_run("Teléfono: ")
        r_tel_l.font.bold = True
        r_tel_l.font.size = Pt(8.5)
        r_tel_l.font.color.rgb = C_MUTED
        r_tel = p_ref.add_run(r["telefono"])
        r_tel.font.bold = True
        r_tel.font.size = Pt(8.5)
        r_tel.font.color.rgb = C_SECONDARY

    # ------------------ CERTIFICACIÓN Y FIRMA ------------------
    sp5 = doc.add_paragraph()
    sp5.paragraph_format.space_before = Pt(14)
    sp5.paragraph_format.space_after = Pt(6)
    sp5.paragraph_format.keep_with_next = True
    
    cert_p = doc.add_paragraph()
    cert_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    cert_p.paragraph_format.space_before = Pt(0)
    cert_p.paragraph_format.space_after = Pt(30)
    cert_p.paragraph_format.keep_with_next = True
    r_cert = cert_p.add_run(
        "\"Para todos los efectos legales, certifico que todas las respuestas e informaciones "
        "anotadas por mí, en la presente hoja de vida son veraces (C.S.T. Art. 62 Num. 1)\""
    )
    r_cert.font.italic = True
    r_cert.font.size = Pt(8.5)
    r_cert.font.color.rgb = C_MUTED

    # Signature Block
    sig_p = doc.add_paragraph()
    sig_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    sig_p.paragraph_format.space_before = Pt(0)
    sig_p.paragraph_format.space_after = Pt(2)
    sig_p.paragraph_format.keep_with_next = True
    r_line = sig_p.add_run("____________________________________________________")
    r_line.font.bold = True
    r_line.font.color.rgb = C_SECONDARY

    name_sig_p = doc.add_paragraph()
    name_sig_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    name_sig_p.paragraph_format.space_before = Pt(2)
    name_sig_p.paragraph_format.space_after = Pt(1)
    name_sig_p.paragraph_format.keep_with_next = True
    r_sig_name = name_sig_p.add_run("ALVARO A. CHAVEZ TRESPALACIO")
    r_sig_name.font.bold = True
    r_sig_name.font.size = Pt(10)
    r_sig_name.font.color.rgb = C_PRIMARY

    cc_sig_p = doc.add_paragraph()
    cc_sig_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    cc_sig_p.paragraph_format.space_before = Pt(0)
    cc_sig_p.paragraph_format.space_after = Pt(0)
    r_sig_cc = cc_sig_p.add_run("C.C. No. 3.816.285 de Barranco de Loba, Bol.")
    r_sig_cc.font.size = Pt(9)
    r_sig_cc.font.color.rgb = C_MUTED

    output_path = r"c:\Users\USER\Documents\Universidad\CEBT\MVP\Hoja_de_Vida_Alvaro_Chavez.docx"
    doc.save(output_path)
    print(f"Document successfully created at: {output_path}")

if __name__ == "__main__":
    make_cv()
