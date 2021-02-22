use num_complex::Complex64;

pub fn r_vec1_to_c_vec1(r_vec1: Vec<f64>) -> Vec<Complex64> {
    let n = r_vec1.len();
    let mut c_vec1: Vec<Complex64> = vec!((Complex::new(0_f64, 0_f64)), n as Complex64);
    for i in 0..n {
        c_vec1[i] = Complex::new(r_vec1[i], 0_f64);
    }
    let res = c_vec1;
    res
}
