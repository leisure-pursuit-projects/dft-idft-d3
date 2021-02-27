use std::f64::consts::PI;

use num_complex::Complex64;

use num::complex::{Complex, Complex64};

pub fn dft(c_vec1: &Vec<Complex64>) -> Vec<Complex64> {
    let n = c_vec1.len();
    let w_n = Complex::new(0_f64, -2_f64 * PI / n as f64);

    let mut c_vec2: Vec<Vec<Complex64>> = Vec::new();
    for i in 0..n {
        let mut f_k: Vec<Complex64> = Vec::new();
        for j in 0..n {
            let i_c = Complex::new(0_f64, i as f64);
            let j_c = Complex::new(0_f64, j as f64);
            let f_n = w_n * i_c * j_c;
            f_k.push(f_n.exp());
        }
        c_vec2.push(f_k.clone());
    }
    let res: Vec<Complex64> = mult_c_vecs(c_vec2, c_vec1);
    res
}

pub fn i_dft(c_vec1: &Vec<Complex64>) -> Vec<Complex64> {
    let n = c_vec1.len();
    let w_n = Complex::new(0_f64, 2_f64 * PI / n as f64);

    let mut c_vec2: Vec<Vec<Complex64>> = Vec::new();
    for i in 0..c_vec1.len() {
        let mut f_k: Vec<Complex64> = Vec::new();
        for j in 0..c_vec1.len() {
            let i_c = Complex::new(0_f64, i as f64);
            let j_c = Complex::new(0_f64, j as f64);
            let f_n = w_n * i_c * j_c;
            f_k.push(f_n.exp());
        }
        c_vec2.push(f_k.clone());
    }
    let res = mult_c_vecs(c_vec2, c_vec1.clone());
    res
}
// TODO implement mult_c_vecs, abstract dft, i-dft
