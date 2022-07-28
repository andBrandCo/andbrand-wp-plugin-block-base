<?php

/**
 * Trait that holds all generic helpers.
 *
 * @package EightshiftLibs\Helpers
 */

declare(strict_types=1);

namespace SebCmWpPluginBlockLibrary\Helpers;


/**
 * Helper class.
 */
class Helper
{
	/**
	 * Encript/Decrypt method.
	 *
	 * @param string $action Action used.
	 * @param string $string String used.
	 *
	 * @return string|bool
	 */
	public static function encryptor(string $action, string $string)
	{
		$encryptMethod = "AES-256-CBC";
		$secretKey = \wp_salt(); // user define private key.
		$secretIv = \wp_salt('SECURE_AUTH_KEY'); // user define secret key.
		$key = \hash('sha256', $secretKey);
		$iv = \substr(\hash('sha256', $secretIv), 0, 16); // sha256 is hash_hmac_algo.

		if ($action === 'encrypt') {
			$output = \openssl_encrypt($string, $encryptMethod, $key, 0, $iv);

			return \base64_encode((string) $output); // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_encode
		}

		return \openssl_decrypt(\base64_decode($string), $encryptMethod, $key, 0, $iv); // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_decode
	}

	/**
	 * Provide error log output to a custom log file.
	 *
	 * @param array<mixed> $message Any type of message.
	 *
	 * @return void
	 */
	public static function logger(array $message): void
	{
		//if (Variables::isLogMode()) {
			$wpContentDir = \defined('WP_CONTENT_DIR') ? \WP_CONTENT_DIR : '';

			if (!empty($wpContentDir)) {
				$message['time'] = \gmdate("Y-m-d H:i:s");
				\error_log((string) \wp_json_encode($message) . "\n -------------------------------------", 3, \WP_CONTENT_DIR . '/eightshift-forms-debug.log'); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
			}
		//}
	}


	/**
	 * Minify string
	 *
	 * @param string $string String to check.
	 *
	 * @return string
	 */
	public static function minifyString(string $string): string
	{
		$string = \str_replace(\PHP_EOL, ' ', $string);
		$string = \preg_replace('/[\r\n]+/', "\n", $string);
		return (string) \preg_replace('/[ \t]+/', ' ', (string) $string);
	}

	/**
	 * Convert camel to snake case
	 *
	 * @param string $input Name to change.
	 *
	 * @return string
	 */
	public static function camelToSnakeCase($input): string
	{
		return \strtolower((string) \preg_replace('/(?<!^)[A-Z]/', '_$0', $input));
	}
}
