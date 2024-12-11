// اعتبارسنجی و بازگشت پیام خطا برای اعداد
export const validateNumber = (value: string | number): string | null => {
    if (/^\d*$/.test(String(value))) {
      return null; // مقدار معتبر است
    }
    return 'Only numbers are allowed.'; // پیام خطا در صورت عدم اعتبار
  };
  
  // اعتبارسنجی و بازگشت پیام خطا برای ایمیل
  export const validateEmail = (value: string): string | null => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (emailRegex.test(value)) {
      return null; // مقدار معتبر است
    }
    return 'Please enter a valid email address.'; // پیام خطا در صورت عدم اعتبار
  };
  
  // اعتبارسنجی و بازگشت پیام خطا برای پسورد
  export const validatePassword = (value: string): string | null => {
    if (value.length >= 6) {
      return null; // مقدار معتبر است
    }
    return 'Password must be at least 6 characters long.'; // پیام خطا در صورت عدم اعتبار
  };
  
  // اعتبارسنجی عمومی و دریافت پیام خطا
  export const validateInput = (type: string, value: string | number): string | null => {
    switch (type) {
      case 'number':
        return validateNumber(value);
      case 'email':
        return validateEmail(value as string);
      case 'password':
        return validatePassword(value as string);
      default:
        return null; // تایپ‌های دیگر نیازی به پیام خطا ندارند
    }
  };
  