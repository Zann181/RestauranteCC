// button_handler.c

#include "button_handler.h"
#include "driver/gpio.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "freertos/queue.h"
#include "button_handler.h"
#include "rgb_led.h"

#define BUTTON_DEBOUNCE_DELAY_MS 50

static int button1_press_count = 0;
static int button2_press_count = 0;
static bool button1_state = false;
static bool button2_state = false;

static int button3_press_count = 0;
static bool button3_state = false;

static bool led_color_red = true; // Variable para alternar el color entre rojo y verde


static QueueHandle_t button_event_queue;

void button_handler_init() {
    // Configure Button 1
    gpio_config_t button1_config = {
        .pin_bit_mask = 1ULL << BUTTON_PIN,
        .mode = GPIO_MODE_INPUT,
        .pull_up_en = GPIO_PULLUP_ENABLE,
        .intr_type = GPIO_INTR_NEGEDGE
    };
    gpio_config(&button1_config);

    // Configure Button 2
    gpio_config_t button2_config = {
        .pin_bit_mask = 1ULL << BUTTON_PIN2,
        .mode = GPIO_MODE_INPUT,
        .pull_up_en = GPIO_PULLUP_ENABLE,
        .intr_type = GPIO_INTR_NEGEDGE
    };
    gpio_config(&button2_config);

      // Configure Button 3
    gpio_config_t button3_config = {
        .pin_bit_mask = 1ULL << BUTTON_PIN3,
        .mode = GPIO_MODE_INPUT,
        .pull_up_en = GPIO_PULLUP_ENABLE,
        .intr_type = GPIO_INTR_NEGEDGE
    };
    gpio_config(&button3_config);



    button_event_queue = xQueueCreate(10, sizeof(uint32_t));
    gpio_install_isr_service(0);
    gpio_isr_handler_add(BUTTON_PIN, button_isr_handler, (void *)BUTTON_PIN);
    gpio_isr_handler_add(BUTTON_PIN2, button_isr_handler, (void *)BUTTON_PIN2);
    gpio_isr_handler_add(BUTTON_PIN3, button_isr_handler, (void *)BUTTON_PIN3);
}

void IRAM_ATTR button_isr_handler(void *arg) {
    uint32_t gpio_num = (uint32_t)arg;
    BaseType_t xHigherPriorityTaskWoken = pdFALSE;
    xQueueSendFromISR(button_event_queue, &gpio_num, &xHigherPriorityTaskWoken);
    if (xHigherPriorityTaskWoken == pdTRUE) {
        portYIELD_FROM_ISR();
    }
}

void button_handler_task(void *pvParameter) {
    while (1) {
        uint32_t gpio_num;
        if (xQueueReceive(button_event_queue, &gpio_num, portMAX_DELAY) == pdTRUE) {
            vTaskDelay(pdMS_TO_TICKS(BUTTON_DEBOUNCE_DELAY_MS));
            if (gpio_num == BUTTON_PIN) {
                bool new_state = gpio_get_level(gpio_num) == 0;
                if (new_state && !button1_state) {
                    button1_press_count++;
                    printf("Entrada: %d\n", button1_press_count);
                }
                button1_state = new_state;
            } else if (gpio_num == BUTTON_PIN2) {
                bool new_state = gpio_get_level(gpio_num) == 0;
                if (new_state && !button2_state) {
                    button2_press_count++;
                    printf("Salida: %d\n", button2_press_count);
                }
                button2_state = new_state;
            } else if (gpio_num == BUTTON_PIN3) {
                bool new_state = gpio_get_level(gpio_num) == 0;
                if (new_state && !button3_state) {
                    button3_press_count++;
                    printf("Botón 3 presionado: %d\n", button3_press_count);

                    // Cambiar el color del LED entre rojo y verde
                    if (led_color_red) {
                        rgb_led_set_color(255, 0, 0); // Rojo
                    } else {
                        rgb_led_set_color(0, 255, 0); // Verde
                    }
                    led_color_red = !led_color_red;
                }
                button3_state = new_state;
        }
    }
}
}

int button1_get_press_count() {
    return button1_press_count;
}

int button2_get_press_count() {
    return button2_press_count;
}

int button3_get_press_count() {
    return button3_press_count;
}