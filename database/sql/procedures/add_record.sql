DELIMITER //

CREATE PROCEDURE IF NOT EXISTS add_record(
    IN p_amount DECIMAL(10,2),
    IN p_category VARCHAR(50),
    IN p_label VARCHAR(100)
)
BEGIN
    INSERT INTO records (amount, category, label, created_at)
    VALUES (p_amount, p_category, p_label, NOW());
END //

DELIMITER ;